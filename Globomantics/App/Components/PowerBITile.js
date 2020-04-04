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
var TileEmbedding_1 = require("./../PowerBI/TileEmbedding");
function PowerBIDashboard(props) {
    var tileContainer = react_1.default.createRef();
    var tileEmbedding = new TileEmbedding_1.TileEmbedding();
    var useStyles = styles_1.makeStyles(function (theme) { return ({
        container: {
            height: "100%"
        }
    }); });
    var classes = useStyles(props.theme);
    react_1.useEffect(function () {
        tileEmbedding.embedTile(props.dashboardName, props.tileName, tileContainer.current);
    }, []);
    return react_1.default.createElement("div", { ref: tileContainer, className: classes.container });
}
exports.default = PowerBIDashboard;
