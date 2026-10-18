// Render the real catalog with a controlled visibleDemos boundary, without a Next server.
import * as renderLoader from '../lifehacks/render-loader.mjs';
const catalogUrl=new URL('./catalog-fixture.mjs',import.meta.url).href;
const linkUrl=new URL('./link-fixture.mjs',import.meta.url).href;
export async function resolve(specifier, context, nextResolve) {
  if (context.parentURL?.endsWith('/src/app/catalog/page.tsx') && specifier === '@/lib/catalog') return {url:catalogUrl,shortCircuit:true};
  if (specifier === 'next/link') return {url:linkUrl,shortCircuit:true};
  return renderLoader.resolve(specifier,context,nextResolve);
}
export async function load(url,context,nextLoad) {
  if (url === catalogUrl) return {format:'module',shortCircuit:true,source:`export const domains = [{id:'cs',name:'Computer science',short:'CS',color:'#246',status:'active'},{id:'math',name:'Mathematics',short:'Math',color:'#246',status:'active'}]; export function visibleDemos(options) { if(options) throw Error('Catalog must use ordinary listing visibility'); globalThis.__algorithmCatalogCalls++; return globalThis.__algorithmCatalogVisible; }`};
  if (url === linkUrl) return {format:'module',shortCircuit:true,source:`import {createElement} from 'react';export default function Link(props){return createElement('a',props,props.children)}`};
  if (url.endsWith('/content/algorithms-200.json')) {
    const {readFile}=await import('node:fs/promises');
    return {format:'module',shortCircuit:true,source:`export default ${await readFile(new URL(url),'utf8')}`};
  }
  return renderLoader.load(url,context,nextLoad);
}
