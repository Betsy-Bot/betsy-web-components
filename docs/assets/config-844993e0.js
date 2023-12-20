import{d as T}from"./index-356e4a49.js";import{j as u}from"./lit-element-bc26ca0f.js";import{S as f,e as E,a as M}from"./index-bab9eea1.js";import{i as D}from"./tiny-invariant-dd7d57d2.js";/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b=(e,r)=>r===void 0?(e==null?void 0:e._$litType$)!==void 0:(e==null?void 0:e._$litType$)===r,{global:p}=__STORYBOOK_MODULE_GLOBAL__,{start:C,simulatePageLoad:_,simulateDOMContentLoaded:v}=__STORYBOOK_MODULE_PREVIEW_API__;var{window:L}=p;L.STORYBOOK_ENV="web-components";var{Node:A}=p,Z=(e,r)=>{let{id:t,component:n}=r;if(!n)throw new Error(`Unable to render story ${t} as the component annotation is missing from the default export`);let o=document.createElement(n);return Object.entries(e).forEach(([s,a])=>{o[s]=a}),o};function R({storyFn:e,kind:r,name:t,showMain:n,showError:o,forceRemount:s},a){let i=e();if(n(),b(i)){(s||!a.querySelector('[id="root-inner"]'))&&(a.innerHTML='<div id="root-inner"></div>');let l=a.querySelector('[id="root-inner"]');u(i,l),_(a)}else if(typeof i=="string")a.innerHTML=i,_(a);else if(i instanceof A){if(a.firstChild===i&&!s)return;a.innerHTML="",a.appendChild(i),v()}else o({title:`Expecting an HTML snippet or DOM node from the story: "${t}" of "${r}".`,description:T`
        Did you forget to return the HTML snippet from the story?
        Use "() => <your snippet or node>" or when defining the story.
      `})}var m=C(R);m.forceReRender;m.clientApi.raw;function y(e){if(!e)return!1;if(typeof e=="string")return!0;throw new Error('Provided component needs to be a string. e.g. component: "my-element"')}function O(e){if(!e)return!1;if(e.tags&&Array.isArray(e.tags)||e.modules&&Array.isArray(e.modules))return!0;throw new Error(`You need to setup valid meta data in your config.js via setCustomElements().
    See the readme of addon-docs for web components for more details.`)}function h(){return p.__STORYBOOK_CUSTOM_ELEMENTS__||p.__STORYBOOK_CUSTOM_ELEMENTS_MANIFEST__}var{window:$,EventSource:I}=p,c;typeof module<"u"&&((c=module==null?void 0:module.hot)!=null&&c.decline)&&(module.hot.decline(),new I("__webpack_hmr").addEventListener("message",function(e){try{let{action:r}=JSON.parse(e.data);r==="built"&&$.location.reload()}catch{}}));const{logger:g}=__STORYBOOK_MODULE_CLIENT_LOGGER__,{useEffect:U,addons:Y}=__STORYBOOK_MODULE_PREVIEW_API__;function w(e,r){var n,o;let t;switch(r){case"attributes":case"properties":t={name:((n=e.type)==null?void 0:n.text)||e.type};break;case"slots":t={name:"string"};break;default:t={name:"void"};break}return{name:e.name,required:!1,description:e.description,type:t,table:{category:r,type:{summary:((o=e.type)==null?void 0:o.text)||e.type},defaultValue:{summary:e.default!==void 0?e.default:e.defaultValue}}}}function N(e){let r=e.name.replace(/(-|_|:|\.|\s)+(.)?/g,(t,n,o)=>o?o.toUpperCase():"").replace(/^([A-Z])/,t=>t.toLowerCase());return r=`on${r.charAt(0).toUpperCase()+r.substr(1)}`,[{name:r,action:{name:e.name},table:{disable:!0}},w(e,"events")]}function d(e,r){return e&&e.filter(t=>t&&t.name).reduce((t,n)=>{if(n.kind==="method")return t;switch(r){case"events":N(n).forEach(o=>{D(o.name,`${o} should have a name property.`),t[o.name]=o});break;default:t[n.name]=w(n,r);break}return t},{})}var k=(e,r)=>{if(!y(e)||!O(r))return null;let t=r.tags.find(n=>n.name.toUpperCase()===e.toUpperCase());return t||g.warn(`Component not found in custom-elements.json: ${e}`),t},B=(e,r)=>{var n;if(!y(e)||!O(r))return null;let t;return(n=r==null?void 0:r.modules)==null||n.forEach(o=>{var s;(s=o==null?void 0:o.declarations)==null||s.forEach(a=>{a.tagName===e&&(t=a)})}),t||g.warn(`Component not found in custom-elements.json: ${e}`),t},S=(e,r)=>(r==null?void 0:r.version)==="experimental"?k(e,r):B(e,r),V=(e,r)=>{let t=S(e,r);return t&&{...d(t.members??[],"properties"),...d(t.properties??[],"properties"),...d(t.attributes??[],"attributes"),...d(t.events??[],"events"),...d(t.slots??[],"slots"),...d(t.cssProperties??[],"css custom properties"),...d(t.cssParts??[],"css shadow parts")}},K=e=>{let r=h();return V(e,r)},H=e=>{let r=S(e,h());return r&&r.description},P=/<!--\?lit\$[0-9]+\$-->|<!--\??-->/g;function j(e){var n;let r=(n=e==null?void 0:e.parameters.docs)==null?void 0:n.source,t=e==null?void 0:e.parameters.__isArgsStory;return(r==null?void 0:r.type)===f.DYNAMIC?!1:!t||(r==null?void 0:r.code)||(r==null?void 0:r.type)===f.CODE}function F(e,r){var s,a;let t=e(),n=(a=(s=r==null?void 0:r.parameters.docs)==null?void 0:s.source)!=null&&a.excludeDecorators?r.originalStoryFn(r.args,r):t,o;if(U(()=>{let{id:i,unmappedArgs:l}=r;o&&Y.getChannel().emit(M,{id:i,source:o,args:l})}),!j(r)){let i=window.document.createElement("div");n instanceof DocumentFragment?u(n.cloneNode(!0),i):u(n,i),o=i.innerHTML.replace(P,"")}return t}var z=[F],q={docs:{extractArgTypes:K,extractComponentDescription:H,story:{inline:!0},source:{type:f.DYNAMIC,language:"html"}}},Q=[E],x={renderer:"web-components",...q};export{Q as argTypesEnhancers,z as decorators,x as parameters,Z as render,R as renderToCanvas};
//# sourceMappingURL=config-844993e0.js.map
