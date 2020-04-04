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
var models = __importStar(require("powerbi-models"));
var SingleVisualEmbedding = /** @class */ (function () {
    function SingleVisualEmbedding(dataSelectionCallback) {
        this.pbiService = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
        this.dataSelectionCallback = dataSelectionCallback;
    }
    SingleVisualEmbedding.prototype.embedVisual = function (reportName, pageName, visualName, hostContainer) {
        var _this = this;
        this.getReportEmbedModel(reportName)
            .then(function (apiResponse) { return _this.getReportEmbedModelFromResponse(apiResponse); })
            .then(function (responseContent) {
            return _this.buildReportEmbedConfiguration(responseContent, pageName, visualName);
        })
            .then(function (reportConfiguration) {
            return _this.runEmbedding(reportConfiguration, hostContainer, reportName);
        });
    };
    SingleVisualEmbedding.prototype.getReportEmbedModel = function (reportName) {
        var request = new Request("/api/embedding/report", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ reportName: reportName })
        });
        return fetch(request);
    };
    SingleVisualEmbedding.prototype.getReportEmbedModelFromResponse = function (response) {
        if (response.status === 200) {
            return response.json();
        }
        else
            throw "Error fetching report embed model";
    };
    SingleVisualEmbedding.prototype.buildReportEmbedConfiguration = function (embedModel, pageName, visualName) {
        return {
            id: embedModel.id,
            embedUrl: embedModel.embedUrl,
            accessToken: embedModel.accessToken,
            type: "visual",
            pageName: pageName,
            visualName: visualName,
            tokenType: pbi.models.TokenType.Embed,
            permissions: pbi.models.Permissions.Read
        };
    };
    SingleVisualEmbedding.prototype.runEmbedding = function (visualConfiguration, hostContainer, reportName) {
        var _this = this;
        var reportVisual = this.pbiService.embed(hostContainer, visualConfiguration);
        reportVisual.off("loaded");
        reportVisual.on("loaded", function () {
            _this.handleTokenExpiration(reportVisual, reportName);
            _this.showReport(hostContainer);
        });
        reportVisual.off("dataSelected");
        reportVisual.on("dataSelected", function (e) {
            if (_this.dataSelectionCallback) {
                _this.dataSelectionCallback(e);
            }
        });
        reportVisual.off("error");
        reportVisual.on("error", function (e) {
            var error = e.detail;
            if (error.level >= models.TraceType.Error) {
                console.log("Handled Embedding Error:", error);
            }
        });
    };
    SingleVisualEmbedding.prototype.handleTokenExpiration = function (reportVisual, reportName) {
        var _this = this;
        var timeoutMilliseconds = 55 * 60 * 1000;
        setTimeout(function () {
            _this.getReportEmbedModel(reportName)
                .then(function (apiResponse) { return _this.getReportEmbedModelFromResponse(apiResponse); })
                .then(function (responseContent) {
                return _this.updateEmbedToken(responseContent, reportVisual, reportName);
            });
        }, timeoutMilliseconds);
    };
    SingleVisualEmbedding.prototype.updateEmbedToken = function (embedModel, report, reportName) {
        var _this = this;
        report
            .setAccessToken(embedModel.accessToken)
            .then(function () { return _this.handleTokenExpiration(report, reportName); });
    };
    SingleVisualEmbedding.prototype.showReport = function (hostContainer) {
        window.setTimeout(function () {
            hostContainer.style.visibility = "visible";
        }, 300);
    };
    return SingleVisualEmbedding;
}());
exports.SingleVisualEmbedding = SingleVisualEmbedding;
