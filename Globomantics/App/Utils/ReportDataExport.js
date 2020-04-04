"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var pbi = __importStar(require("powerbi-client"));
var file_saver_1 = require("file-saver");
function exportReportData(report, pageIndex, visualTitle, fileName) {
    report.getPages().then(function (pages) {
        pages[pageIndex].getVisuals().then(function (visuals) {
            var targetVisual = visuals.find(function (x) { return x.title === visualTitle; });
            if (targetVisual) {
                exportVisualData(targetVisual, fileName);
            }
        });
    });
}
exports.exportReportData = exportReportData;
function exportVisualData(visual, fileName) {
    visual.exportData(pbi.models.ExportDataType.Summarized).then(function (data) {
        triggerFileDownload(fileName, data.data);
    });
}
function triggerFileDownload(fileName, fileContents) {
    if (fileContents && fileName) {
        try {
            var blob = new Blob([fileContents], {
                type: "text/plain;charset=utf-8"
            });
            file_saver_1.saveAs(blob, fileName);
        }
        catch (ex) {
            console.error(ex);
        }
    }
}
