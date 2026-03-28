import { useRef as a, useEffect as f } from "react";
import { CardFoil as l } from "./index.mjs";
function p({ intensity: r = 1, tilt: t = !0, specular: n = !0, style: s, className: c }) {
  const e = a(null);
  return f(() => {
    if (!e.current) return;
    const o = e.current.parentElement;
    if (!o) return;
    const u = new l(o, { intensity: r, tilt: t, specular: n });
    return () => u.destroy();
  }, [r, t, n]), /* @__PURE__ */ React.createElement("span", { ref: e, style: { display: "none" } });
}
export {
  p as FoilOverlay,
  p as default
};
