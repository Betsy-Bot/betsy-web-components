import{w as u,x as c}from"./lit-element-bc26ca0f.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},d=o=>(...t)=>({_$litDirective$:o,values:t});let a=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const i="important",b=" !"+i,h=d(class extends a{constructor(o){var t;if(super(o),o.type!==l.ATTRIBUTE||o.name!=="style"||((t=o.strings)==null?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(o){return Object.keys(o).reduce((t,e)=>{const s=o[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(o,[t]){const{style:e}=o.element;if(this.ut===void 0)return this.ut=new Set(Object.keys(t)),this.render(t);for(const s of this.ut)t[s]==null&&(this.ut.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(const s in t){const n=t[s];if(n!=null){this.ut.add(s);const r=typeof n=="string"&&n.endsWith(b);s.includes("-")||r?e.setProperty(s,r?n.slice(0,-11):n,r?i:""):e[s]=n}}return u}});const $=({primary:o,backgroundColor:t,size:e,label:s,onClick:n})=>{const r=o?"storybook-button--primary":"storybook-button--secondary";return c`
    <button
      type="button"
      class=${["storybook-button",`storybook-button--${e||"medium"}`,r].join(" ")}
      style=${h({backgroundColor:t})}
      @click=${n}
    >
      ${s}
    </button>
  `};export{$ as B};
//# sourceMappingURL=Button-2e719106.js.map
