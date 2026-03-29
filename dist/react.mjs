import m, { useRef as s, useEffect as t } from "react";
import { CardFoil as R } from "./index.mjs";
function E({
  finish: n = "foil",
  intensity: u = 1,
  tilt: o = !0,
  specular: c = !0,
  shimmer: l = !0,
  style: d,
  className: i,
  ...p
}) {
  const a = s(null), r = s(null);
  return t(() => {
    if (!a.current)
      return;
    const e = a.current.parentElement;
    if (e)
      return r.current = new R(e, {
        finish: n,
        intensity: u,
        tilt: o,
        specular: c,
        shimmer: l
      }), () => {
        var f;
        (f = r.current) == null || f.destroy(), r.current = null;
      };
  }, []), t(() => {
    var e;
    (e = r.current) == null || e.setFinish(n);
  }, [n]), t(() => {
    var e;
    (e = r.current) == null || e.setIntensity(u);
  }, [u]), t(() => {
    var e;
    (e = r.current) == null || e.setTilt(o);
  }, [o]), t(() => {
    var e;
    (e = r.current) == null || e.setSpecular(c);
  }, [c]), t(() => {
    var e;
    (e = r.current) == null || e.setShimmer(l);
  }, [l]), /* @__PURE__ */ m.createElement(
    "span",
    {
      ...p,
      ref: a,
      "aria-hidden": "true",
      className: i,
      style: { ...d, display: "none" }
    }
  );
}
export {
  E as FoilOverlay,
  E as default
};
