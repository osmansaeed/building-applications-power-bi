"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var styles_1 = require("@material-ui/core/styles");
var useMediaQuery_1 = __importDefault(require("@material-ui/core/useMediaQuery"));
var DashboardEmbedding_1 = require("./../PowerBI/DashboardEmbedding");
function PowerBIDashboard(props) {
    var dashboardContainer = react_1.default.createRef();
    var dashboardEmbedding = new DashboardEmbedding_1.DashboardEmbedding(redirectionHandler);
    var useStyles = styles_1.makeStyles(function (theme) { return ({
        container: {
            height: "100%"
        }
    }); });
    var theme = styles_1.useTheme();
    var isMobileViewport = useMediaQuery_1.default(theme.breakpoints.down("xs"), {
        noSsr: true
    });
    var classes = useStyles(props.theme);
    react_1.useEffect(function () {
        dashboardEmbedding.embedDashboard(props.dashboardName, dashboardContainer.current, isMobileViewport);
    }, []);
    function redirectionHandler(targetLocation) {
        props.history.push(targetLocation);
    }
    return react_1.default.createElement("div", { ref: dashboardContainer, className: classes.container });
}
exports.default = PowerBIDashboard;
