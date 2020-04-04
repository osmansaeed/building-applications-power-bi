"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var styles_1 = require("@material-ui/core/styles");
var SingleVisualEmbedding_1 = require("./../PowerBI/SingleVisualEmbedding");
function PowerBIVisual(props) {
    var reportContainer = react_1.default.createRef();
    var singleVisualEmbedding = new SingleVisualEmbedding_1.SingleVisualEmbedding(props.dataSelectionCallback);
    var useStyles = styles_1.makeStyles(function (theme) { return ({
        container: {
            height: "100%",
            visibility: "hidden"
        },
        visualWrapper: {
            height: "100%",
            backgroundImage: "url('/images/globomantics_loader.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50% 50%",
            backgroundSize: "contain"
        }
    }); });
    var classes = useStyles(props.theme);
    react_1.useEffect(function () {
        singleVisualEmbedding.embedVisual(props.reportName, props.pageName, props.visualName, reportContainer.current);
    }, []);
    return (react_1.default.createElement("div", { className: classes.visualWrapper },
        react_1.default.createElement("div", { ref: reportContainer, className: classes.container })));
}
exports.default = PowerBIVisual;
