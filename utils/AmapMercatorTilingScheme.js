import CoordTransform from './CoordTransform';
import { WebMercatorTilingScheme, WebMercatorProjection, Cartesian2, Cartographic, Math as CesiumMath } from 'cesium';

class AmapMercatorTilingScheme extends WebMercatorTilingScheme {
    constructor() {
        super();

        let projection = new WebMercatorProjection();

        this._projection = {};
        this._projection.project = function (cartographic, result) {
            result = CoordTransform.WGS84ToGCJ02(
                CesiumMath.toDegrees(cartographic.longitude),
                CesiumMath.toDegrees(cartographic.latitude)
            );
            result = projection.project(new Cartographic(CesiumMath.toRadians(result[0]), CesiumMath.toRadians(result[1])));
            return new Cartesian2(result.x, result.y);
        };

        this._projection.unproject = function (cartesian, result) {
            let cartographic = projection.unproject(cartesian);
            result = CoordTransform.GCJ02ToWGS84(
                CesiumMath.toDegrees(cartographic.longitude),
                CesiumMath.toDegrees(cartographic.latitude)
            );
            return new Cartographic(CesiumMath.toRadians(result[0]), CesiumMath.toRadians(result[1]));
        };
    }
}

export default AmapMercatorTilingScheme;