import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { VILLAGE_RISKS } from '../../data/mockData';
import jsPDF from 'jspdf';

export const RegionalAnalyticsPage: React.FC = () => {
  const { showToast } = useApp();
  const navigate = useNavigate();
  const [selectedCrop, setSelectedCrop] = useState('All Crops');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [diseaseType, setDiseaseType] = useState('All Pathogens & Pests');

  // Dynamic data calculation based on filters
  const getFilteredData = () => {
    // Base data multipliers based on crop type
    const cropMultipliers: Record<string, number> = {
      'All Crops': 1.0,
      'Tomato': 1.3,
      'Wheat': 0.7,
      'Maize': 0.9,
      'Rice': 1.1,
      'Potato': 0.8
    };

    // Date range multipliers
    const dateMultipliers: Record<string, number> = {
      'Last 30 Days': 1.0,
      'Last 90 Days': 2.8,
      'Current Kharif Season': 3.5,
      'This Year (2026)': 5.2
    };

    // Region multipliers - different regions have different case loads
    const regionMultipliers: Record<string, number> = {
      'All Regions (Siwan)': 1.0,
      'North Valley Sector': 1.2,
      'Village A Sector': 0.9,
      'Eastern Plains': 0.8,
      'Southern Basin': 0.7
    };

    // Disease type multipliers - specific diseases have different prevalence
    const diseaseMultipliers: Record<string, number> = {
      'All Pathogens & Pests': 1.0,
      'Early Blight (Alternaria)': 0.42,  // 42% of total
      'Fall Armyworm (Spodoptera)': 0.31, // 31% of total
      'Stem Rust (Puccinia)': 0.27,       // 27% of total
      'Late Blight (Phytophthora)': 0.35
    };

    const cropMult = cropMultipliers[selectedCrop] || 1.0;
    const dateMult = dateMultipliers[dateRange] || 1.0;
    const regionMult = regionMultipliers[selectedRegion] || 1.0;
    const diseaseMult = diseaseMultipliers[diseaseType] || 1.0;

    const baseTotal = 1248;
    const totalCases = Math.round(baseTotal * cropMult * dateMult * regionMult * diseaseMult);

    // Disease distribution varies by crop AND disease filter
    let blightPercent = 42;
    let armywormPercent = 31;
    let rustPercent = 27;

    // If specific disease is selected, show 100% of that disease
    if (diseaseType === 'Early Blight (Alternaria)' || diseaseType === 'Late Blight (Phytophthora)') {
      blightPercent = 100;
      armywormPercent = 0;
      rustPercent = 0;
    } else if (diseaseType === 'Fall Armyworm (Spodoptera)') {
      blightPercent = 0;
      armywormPercent = 100;
      rustPercent = 0;
    } else if (diseaseType === 'Stem Rust (Puccinia)') {
      blightPercent = 0;
      armywormPercent = 0;
      rustPercent = 100;
    } else {
      // Distribution varies by crop when "All Pathogens" is selected
      if (selectedCrop === 'Tomato') {
        blightPercent = 58;
        armywormPercent = 22;
        rustPercent = 20;
      } else if (selectedCrop === 'Wheat') {
        blightPercent = 25;
        armywormPercent = 15;
        rustPercent = 60;
      } else if (selectedCrop === 'Maize') {
        blightPercent = 30;
        armywormPercent = 55;
        rustPercent = 15;
      } else if (selectedCrop === 'Rice') {
        blightPercent = 48;
        armywormPercent = 28;
        rustPercent = 24;
      } else if (selectedCrop === 'Potato') {
        blightPercent = 65;
        armywormPercent = 20;
        rustPercent = 15;
      }

      // Region also affects disease distribution
      if (selectedRegion === 'North Valley Sector') {
        // North has more blight
        blightPercent = Math.min(blightPercent + 10, 100);
        rustPercent = Math.max(rustPercent - 10, 0);
      } else if (selectedRegion === 'Eastern Plains') {
        // East has more rust
        rustPercent = Math.min(rustPercent + 15, 100);
        blightPercent = Math.max(blightPercent - 15, 0);
      } else if (selectedRegion === 'Southern Basin') {
        // South has more pest issues
        armywormPercent = Math.min(armywormPercent + 12, 100);
        blightPercent = Math.max(blightPercent - 12, 0);
      }
    }

    // Weekly trend data changes with ALL filters
    const baseTrend = [30, 45, 60, 80, 50, 70, 95, 82];
    
    // Different regions have different trend patterns
    let trendPattern = baseTrend;
    if (selectedRegion === 'North Valley Sector') {
      trendPattern = [35, 50, 70, 90, 60, 80, 105, 95]; // Steeper increase
    } else if (selectedRegion === 'Eastern Plains') {
      trendPattern = [25, 35, 50, 65, 40, 55, 75, 65]; // Lower overall
    } else if (selectedRegion === 'Southern Basin') {
      trendPattern = [20, 30, 45, 60, 35, 50, 70, 60]; // Lowest
    }

    // Scale trend based on all multipliers
    const trendData = trendPattern.map(val => 
      Math.round(val * cropMult * (dateMult / 2) * regionMult * diseaseMult)
    );

    return {
      totalCases,
      blightPercent,
      armywormPercent,
      rustPercent,
      trendData
    };
  };

  const filteredData = getFilteredData();

  // CSV Export function
  const handleExportCSV = () => {
    // Create CSV header
    const headers = ['Village Name', 'Active Cases', 'Risk Level', 'Trend (7 Days)', 'Trend Direction'];
    
    // Create CSV rows from village data
    const rows = VILLAGE_RISKS.map(village => [
      village.name,
      village.activeCases.toString(),
      village.riskLevel,
      village.trend,
      village.trendDirection
    ]);

    // Add summary statistics
    const summaryRows = [
      [''],
      ['SUMMARY STATISTICS'],
      ['Total Cases', filteredData.totalCases.toString()],
      ['Date Range', dateRange],
      ['Crop Type', selectedCrop],
      ['Region', selectedRegion],
      ['Disease Type', diseaseType],
      [''],
      ['DISEASE DISTRIBUTION'],
      ['Blight', `${filteredData.blightPercent}%`],
      ['Armyworm', `${filteredData.armywormPercent}%`],
      ['Rust', `${filteredData.rustPercent}%`]
    ];

    // Combine all data
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
      ...summaryRows.map(row => row.join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `analytics-report-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast('Analytics data exported to CSV successfully!');
  };

  // PDF Export function - generates actual PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Set up fonts and colors
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let yPos = 20;

    // Title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('AGRIDETECT ANALYTICS REPORT', margin, yPos);
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated: ${new Date().toLocaleString()}`, margin, yPos);
    
    // Horizontal line
    yPos += 5;
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;

    // Filters Section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('FILTERS APPLIED', margin, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date Range: ${dateRange}`, margin + 5, yPos);
    yPos += 6;
    doc.text(`Crop Type: ${selectedCrop}`, margin + 5, yPos);
    yPos += 6;
    doc.text(`Region: ${selectedRegion}`, margin + 5, yPos);
    yPos += 6;
    doc.text(`Disease Type: ${diseaseType}`, margin + 5, yPos);
    yPos += 12;

    // Summary Statistics Section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('SUMMARY STATISTICS', margin, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Cases: ${filteredData.totalCases.toLocaleString()}`, margin + 5, yPos);
    yPos += 6;
    doc.text(`Blight Cases: ${filteredData.blightPercent}%`, margin + 5, yPos);
    yPos += 6;
    doc.text(`Armyworm Cases: ${filteredData.armywormPercent}%`, margin + 5, yPos);
    yPos += 6;
    doc.text(`Rust Cases: ${filteredData.rustPercent}%`, margin + 5, yPos);
    yPos += 12;

    // Village Breakdown Section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('VILLAGE-LEVEL BREAKDOWN', margin, yPos);
    yPos += 8;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    
    VILLAGE_RISKS.forEach((village, index) => {
      if (yPos > 270) { // Check if near bottom of page
        doc.addPage();
        yPos = 20;
      }
      
      const villageText = `${village.name}: ${village.activeCases} cases (${village.riskLevel} Risk, ${village.trend} trend)`;
      doc.text(villageText, margin + 5, yPos);
      yPos += 6;
    });

    yPos += 6;

    // Weekly Trend Section
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('WEEKLY INCIDENT TREND', margin, yPos);
    yPos += 8;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    
    filteredData.trendData.forEach((val, i) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(`Week ${i + 1}: ${val} cases`, margin + 5, yPos);
      yPos += 6;
    });

    // Footer
    yPos = doc.internal.pageSize.getHeight() - 15;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text('Report compiled by AgriDetect AI System', margin, yPos);
    doc.text('Siwan District Agricultural Monitoring', margin, yPos + 5);

    // Save the PDF
    doc.save(`analytics-report-${new Date().toISOString().split('T')[0]}.pdf`);
    
    showToast('PDF report generated and downloaded successfully!');
  };

  return (
    <div className="p-container-margin max-w-7xl mx-auto space-y-gutter w-full">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
            Disease Analytics &amp; Trends
          </h1>
          <p className="text-on-surface-variant font-body-md mt-1">
            Epidemiological intelligence, temporal progression, and village-level vulnerability metrics.
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={handleExportPDF}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-surface text-primary border border-outline rounded-full hover:bg-surface-container-low transition-colors font-bold h-touch-target-min cursor-pointer text-sm"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            <span>PDF Report</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-surface text-primary border border-outline rounded-full hover:bg-surface-container-low transition-colors font-bold h-touch-target-min cursor-pointer text-sm"
          >
            <span className="material-symbols-outlined text-sm">dataset</span>
            <span>CSV Data</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-surface-container-lowest p-card-padding rounded-xl shadow-sm border border-outline-variant">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase font-bold">
              Date Range
            </label>
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-surface border border-outline rounded-lg p-2 text-on-surface h-10 text-sm focus:border-primary outline-none"
            >
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Current Kharif Season</option>
              <option>This Year (2026)</option>
            </select>
          </div>
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase font-bold">
              Crop Type
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full bg-surface border border-outline rounded-lg p-2 text-on-surface h-10 text-sm focus:border-primary outline-none"
            >
              <option>All Crops</option>
              <option>Tomato</option>
              <option>Wheat</option>
              <option>Maize</option>
              <option>Rice</option>
              <option>Potato</option>
            </select>
          </div>
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase font-bold">
              Region / Block
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full bg-surface border border-outline rounded-lg p-2 text-on-surface h-10 text-sm focus:border-primary outline-none"
            >
              <option>All Regions (Siwan)</option>
              <option>North Valley Sector</option>
              <option>Village A Sector</option>
              <option>Eastern Plains</option>
              <option>Southern Basin</option>
            </select>
          </div>
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase font-bold">
              Disease Type
            </label>
            <select 
              value={diseaseType}
              onChange={(e) => setDiseaseType(e.target.value)}
              className="w-full bg-surface border border-outline rounded-lg p-2 text-on-surface h-10 text-sm focus:border-primary outline-none"
            >
              <option>All Pathogens &amp; Pests</option>
              <option>Early Blight (Alternaria)</option>
              <option>Fall Armyworm (Spodoptera)</option>
              <option>Stem Rust (Puccinia)</option>
              <option>Late Blight (Phytophthora)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bento Visual Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pie Chart Card */}
        <div className="bg-surface-container-lowest p-card-padding rounded-xl shadow-sm border border-outline-variant col-span-1 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-primary"></div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-4 font-bold text-base">
            Disease-wise Distribution
          </h3>
          <div className="flex-1 flex items-center justify-center min-h-[220px] relative">
            <div className="w-44 h-44 rounded-full bg-surface-container border-8 border-surface flex items-center justify-center relative shadow-inner overflow-hidden">
              <div
                className="absolute inset-0 bg-error opacity-75"
                style={{ clipPath: `polygon(50% 50%, 0 50%, 0 0, 100% 0, 100% ${filteredData.blightPercent}%)` }}
              ></div>
              <div
                className="absolute inset-0 bg-amber-500 opacity-60"
                style={{ clipPath: `polygon(50% 50%, 100% ${filteredData.blightPercent}%, 100% 100%, ${100 - filteredData.rustPercent}% 100%)` }}
              ></div>
              <div
                className="absolute inset-0 bg-primary opacity-50"
                style={{ clipPath: `polygon(50% 50%, ${100 - filteredData.rustPercent}% 100%, 0 100%, 0 50%)` }}
              ></div>
              <div className="w-20 h-20 bg-surface-container-lowest rounded-full flex flex-col items-center justify-center z-10 shadow-sm">
                <span className="text-xs font-bold text-on-surface">Total</span>
                <span className="font-status-number text-primary font-bold text-sm">{filteredData.totalCases.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <span className="w-3 h-3 rounded-full bg-error"></span> Blight ({filteredData.blightPercent}%)
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span> Armyworm ({filteredData.armywormPercent}%)
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <span className="w-3 h-3 rounded-full bg-primary"></span> Rust ({filteredData.rustPercent}%)
            </div>
          </div>
        </div>

        {/* Area / Trend Chart Card */}
        <div className="bg-surface-container-lowest p-card-padding rounded-xl shadow-sm border border-outline-variant col-span-1 md:col-span-2 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-secondary"></div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-4 font-bold text-base">
            Weekly Incident Volume by Block (Trend)
          </h3>
          <div className="flex-1 flex items-end justify-between min-h-[220px] relative border-b border-l border-outline-variant pb-2 pl-2 gap-3">
            {filteredData.trendData.map((height, index) => {
              const maxHeight = Math.max(...filteredData.trendData);
              const percentage = (height / maxHeight) * 100;
              const isHighlight = index >= filteredData.trendData.length - 2;
              return (
                <div 
                  key={index}
                  className={`flex-1 ${isHighlight ? 'bg-error' : 'bg-primary'} rounded-t-sm transition-all duration-500`}
                  style={{ 
                    height: `${percentage}%`,
                    opacity: isHighlight ? 0.9 : 0.5 + (index * 0.05)
                  }}
                  title={`Week ${index + 1}: ${height} cases`}
                ></div>
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-on-surface-variant mt-2 px-1 font-label-caps font-semibold">
            <span>W1</span>
            <span>W2</span>
            <span>W3</span>
            <span>W4</span>
            <span>W5</span>
            <span>W6</span>
            <span className="text-error font-bold">W7 (Peak)</span>
            <span>W8 (Proj)</span>
          </div>
        </div>
      </div>

      {/* Village Data Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
        <div className="p-card-padding border-b border-outline-variant bg-surface flex justify-between items-center">
          <h3 className="font-headline-md text-headline-md text-on-surface font-bold text-base">
            Village-level Risk &amp; Outbreak Summary
          </h3>
          <span className="text-xs text-on-surface-variant font-medium">5 Sectors Audited</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant font-bold">Village Name</th>
                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant font-bold">Active Cases</th>
                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant font-bold">Risk Level</th>
                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant font-bold">Trend (7 Days)</th>
                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 text-sm font-medium">
              {VILLAGE_RISKS.map((village) => (
                <tr key={village.name} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="p-4 font-bold text-on-surface">{village.name}</td>
                  <td className="p-4">{village.activeCases}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        village.riskLevel === 'High'
                          ? 'bg-error-container text-on-error-container'
                          : village.riskLevel === 'Medium'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-secondary-container text-on-secondary-container'
                      }`}
                    >
                      {village.riskLevel}
                    </span>
                  </td>
                  <td className="p-4">
                    <div
                      className={`flex items-center gap-1 font-bold ${
                        village.trendDirection === 'up' ? 'text-error' : village.trendDirection === 'down' ? 'text-secondary' : 'text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {village.trendDirection === 'up' ? 'trending_up' : village.trendDirection === 'down' ? 'trending_down' : 'trending_flat'}
                      </span>
                      <span>{village.trend}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => navigate(`/dao/village/${village.name}`)}
                      className="text-primary hover:text-primary-container p-2 rounded-full hover:bg-surface-container-low transition-colors cursor-pointer"
                      title="Inspect Sector"
                    >
                      <span className="material-symbols-outlined text-lg">visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
