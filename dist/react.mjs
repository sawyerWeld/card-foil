import { useRef as f, useEffect as u } from "react";
import { CardFoil as s } from "./index.mjs";
function p({
  finish: r = "foil",
  intensity: t = 1,
  tilt: l = !0,
  shimmer: o = !0,
  specular: a = !0
}) {
  const n = f(null), e = f(null);
  return u(() => {
    if (!n.current) return;
    const c = n.current.parentElement;
    if (c)
      return e.current = new s(c, {
        finish: r,
        intensity: t,
        tilt: l,
        shimmer: o,
        specular: a
      }), () => {
        e.current && e.current.destroy();
      };
  }, []), u(() => {
    e.current && e.current.setFinish(r);
  }, [r]), u(() => {
    e.current && e.current.setIntensity(t);
  }, [t]), /* @__PURE__ */ React.createElement("div", { ref: n, style: { display: "none" } });
}
export {
  p as FoilOverlay,
  p as default
};
