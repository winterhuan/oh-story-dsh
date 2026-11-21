window.__ModuleLoader__.load({id:"@winterhuan/oh-story-dsh",factory:(require)=>{var module={exports:{}};var exports=module.exports;
"use strict";var Mt=Object.defineProperty;var Ji=Object.getOwnPropertyDescriptor;var Ki=Object.getOwnPropertyNames;var Yi=Object.prototype.hasOwnProperty;var Qi=(e,o)=>{for(var t in o)Mt(e,t,{get:o[t],enumerable:!0})},Zi=(e,o,t,n)=>{if(o&&typeof o=="object"||typeof o=="function")for(let a of Ki(o))!Yi.call(e,a)&&a!==t&&Mt(e,a,{get:()=>o[a],enumerable:!(n=Ji(o,a))||n.enumerable});return e};var Xi=e=>Zi(Mt({},"__esModule",{value:!0}),e);var Hd={};Qi(Hd,{apply:()=>ei,default:()=>Fd,inject:()=>Kr,name:()=>Jr});module.exports=Xi(Hd);var Ur=require("@deepseek-ai/dsh-client-store"),k=require("react"),bn=require("react-dom");var Un=["\u6B63\u6587","\u5927\u7EB2","\u8BBE\u5B9A","\u8FFD\u8E2A","\u5BF9\u6807","\u53C2\u8003\u8D44\u6599"],Jn=["\u8F93\u5165","\u9879\u76EE\u5F00\u53D1","\u8BBE\u5B9A\u96C6","\u5267\u96C6","\u4EA4\u4ED8","\u521B\u4F5C\u8005\u51B3\u7B56","\u5BA1\u67E5"],Xo="game-adaptations",et="video-recaps",es=[et,Xo,...Un,...Jn],Kn=["\u6B63\u6587.md","\u8BBE\u5B9A.md","\u5C0F\u8282\u5927\u7EB2.md"],Ot=new Set(Kn),os=new Set(["short-drama.json",...Kn]),ts=new Set(Un),ns=new Set(Jn),as=new Set(es),Vt=new Set([".md",".txt",".json",".jsonl"]),rs=new Set([...Vt,".html",".css",".js",".mjs",".cjs",".ts",".tsx",".jsx"]),is=new Set([...Vt,".srt",".ass"]);function ss(e){let o=e.lastIndexOf("/"),t=o<0?e:e.slice(o+1),n=t.lastIndexOf(".");return n<=0?"":t.slice(n).toLowerCase()}function Yn(e){return e!==""&&!e.startsWith("/")&&!e.includes("\\")&&!e.split("/").some(o=>o===""||o==="."||o==="..")}function Qn(e){let o=e.split("/",1)[0];return o!==void 0&&as.has(o)||os.has(e)}function Zn(e){return(e.startsWith(`${Xo}/`)?rs:e.startsWith(`${et}/`)?is:Vt).has(ss(e))}function Xn(e){return ts.has(e)}function ea(e){return ns.has(e)}var ds={story:"\u5C0F\u8BF4",drama:"\u77ED\u5267",game:"\u6E38\u620F",video:"\u89C6\u9891"};function fo(e){return ds[e]}var oa=Ot,ls=new Set(["write","edit","str_replace_editor","bash","run_code","oh_story_role"]);function ta(e){for(let o of e.turnOrder.toReversed()){let t=e.turns.get(o);if(t!==void 0)for(let n of t.steps.toReversed()){let a=n.data.get("assistant-step");if(a?.status==="running")return a}}return null}function cs(e){switch(e){case'"':return'"';case"\\":return"\\";case"/":return"/";case"b":return"\b";case"f":return"\f";case"n":return`
`;case"r":return"\r";case"t":return"	";default:return}}function Ye(e,o){let t=new RegExp(`"${o.replace(/[.*+?^${}()|[\]\\]/gu,"\\$&")}"\\s*:\\s*"`,"u").exec(e);if(t===null)return;let n="";for(let a=t.index+t[0].length;a<e.length;a+=1){let r=e[a]??"";if(r==='"')return{value:n,complete:!0};if(r!=="\\"){n+=r;continue}let s=e[a+1];if(s===void 0)return{value:n,complete:!1};if(s==="u"){let g=e.slice(a+2,a+6);if(!/^[\da-f]{4}$/iu.test(g))return{value:n,complete:!1};n+=String.fromCharCode(Number.parseInt(g,16)),a+=5;continue}let i=cs(s);if(i===void 0)return{value:n,complete:!1};n+=i,a+=1}return{value:n,complete:!1}}function At(e,o){let t=Ye(e,o);return t?.complete===!0?t.value:void 0}function us(e){try{let o=JSON.parse(e);return typeof o=="object"&&o!==null&&!Array.isArray(o)?o:void 0}catch{return}}function Oo(e,o,t,n,a){let r=us(t);if(e==="write")return{callId:o,name:e,argsRaw:t,stage:n,path:Ye(t,"file_path")?.value,operation:"replace-file",oldText:void 0,newText:Ye(t,"content")?.value,replaceAll:!1};if(e==="edit")return{callId:o,name:e,argsRaw:t,stage:n,path:Ye(t,"file_path")?.value,operation:"replace-text",oldText:At(t,"old_string"),newText:Ye(t,"new_string")?.value,replaceAll:r?.replace_all===!0};if(e!=="str_replace_editor")return;let s=At(t,"command");if(s==="view")return;let i=Ye(t,"path")?.value;return s==="create"?{callId:o,name:e,argsRaw:t,stage:n,path:i,operation:"replace-file",oldText:void 0,newText:Ye(t,"file_text")?.value,replaceAll:!1}:s==="str_replace"?{callId:o,name:e,argsRaw:t,stage:n,path:i,operation:"replace-text",oldText:At(t,"old_str"),newText:Ye(t,"new_str")?.value??(a??r!==void 0?"":void 0),replaceAll:r?.replace_all===!0}:s==="insert"?{callId:o,name:e,argsRaw:t,stage:n,path:i,operation:"insert-text",oldText:void 0,newText:Ye(t,"new_str")?.value,replaceAll:!1}:{callId:o,name:e,argsRaw:t,stage:n,path:i,operation:void 0,oldText:void 0,newText:void 0,replaceAll:!1}}function Wt(e,o){for(let t of e)"kind"in t||o(t),Wt(t.subCalls,o)}function na(e){let o=e.timeline.turnOrder.at(-1),t=o===void 0?void 0:e.timeline.turns.get(o);if(t===void 0||t.status==="closed")return[];let n=[];for(let r of t.steps){let s=r.data.get("assistant-step");if(s?.status==="settled")for(let i of s.blocks)i.kind==="tool-call"&&n.push({callId:i.callId,name:i.name,argsRaw:i.argsRaw})}if(n.length===0)return n;let a=new Set;for(let r of e.legacy.nodes){let s=r;s.kind==="tool-result"&&typeof s.callId=="string"&&a.add(s.callId)}return n.filter(r=>!a.has(r.callId))}function aa(e,o){return e.length===o.length&&e.every((t,n)=>t.callId===o[n]?.callId&&t.argsRaw===o[n].argsRaw)}function ra(e,o=null,t=[]){let n=[];Wt(e,a=>{if(a.phase==="start"){let i=Oo(a.name,a.callId,a.argsRaw,"running");i!==void 0&&n.push(i);return}if(a.args===void 0||!["write","edit","str_replace_editor"].includes(a.name))return;let r={};for(let i of["file_path","path","content","file_text","new_string","new_str","old_string","old_str","command","insert_line","replace_all"]){if(["old_string","old_str","command"].includes(i)&&!a.args.complete(i))continue;let g=a.args.text(i)??a.args.value(i);g!==void 0&&(r[i]=g)}if(Object.keys(r).length===0)return;let s=Oo(a.name,a.callId,JSON.stringify(r),"streaming",a.args.closed());s!==void 0&&n.push(s)});for(let a of t){if(n.some(s=>s.callId===a.callId))continue;let r=Oo(a.name,a.callId,a.argsRaw,"running");r!==void 0&&n.push(r)}for(let a of o?.blocks??[]){if(a.kind!=="tool-call")continue;let r=Oo(a.name,a.callId,a.argsRaw,"streaming");r!==void 0&&!n.some(s=>s.callId===r.callId)&&n.push(r)}return n}function ia(e){let o=new Set;return Wt(e,t=>{ls.has(t.name)&&o.add(t.callId)}),o}function sa(e){let o=e.subCalls.flatMap(sa);if(!("kind"in e)||e.isError||e.call===null)return o;let t=Oo(e.call.name,e.callId,e.call.argsRaw,"running");return t?.path===void 0?o:[`${e.callId}\0${t.path}`,...o]}function da(e){for(let o of e.order.toReversed()){let t=e.nodes.get(o);if(t?.kind!=="tool-call")continue;let n=t.data.root,a=n===void 0?void 0:sa(n).at(-1);if(a===void 0)continue;let r=t.location;return{signal:a,turn:r.kind==="turn"||r.kind==="step"?r.turn.turn:void 0}}}function la(e){return da(e)?.signal}function ca(e){return da(e)?.turn}function ua(e){let o=e.timeline.turnOrder.at(-1);if(o!==void 0)return e.timeline.turns.get(o)?.status==="open"?o:void 0}function Vo(e,o){if(e===void 0||e==="")return;let t=e.replaceAll("\\","/"),n=o?.replaceAll("\\","/").replace(/\/$/u,""),a=n!==void 0&&t.startsWith(`${n}/`);if((t.startsWith("/")||/^[a-z]:\//iu.test(t)||t.startsWith("file:"))&&!a)return;let r=a?t.slice(n.length+1):t.replace(/^\.\//u,"");if(!(!Yn(r)||!Qn(r)||!Zn(r)))return r}function Qe(e){if(e==="short-drama.json")return"drama";if(e!==void 0&&Ot.has(e))return"story";let o=e?.split("/",1)[0];if(o!==void 0&&Xn(o))return"story";if(o!==void 0&&ea(o))return"drama";if(o===Xo)return"game";if(o===et)return"video"}function pa(e,o,t,n){let a=r=>r==="game"?t.length>0:r==="video"?n.length>0:o.some(s=>Qe(s.path)===r);return a(e)?e:["story","drama","game","video"].find(a)??e}function ot(e,o){let t=e.filter(a=>Qe(a.path)===o),n=o==="story"?[/^正文\/.*\.md$/u,/^正文\.md$/u,/^小节大纲\.md$/u,/^大纲\/.*\.md$/u,/\.md$/u]:o==="drama"?[/^剧集\/EP0*1\/剧本\.md$/u,/^剧集\/.*\/剧本\.md$/u,/^剧集\/EP0*1\/screenplay\.md$/iu,/^剧集\/.*\/screenplay\.md$/iu,/^项目开发\/creative-brief\.md$/u,/^输入\/.*\.md$/u,/\.md$/u,/^short-drama\.json$/u]:o==="game"?[/^game-adaptations\/[^/]+\/PRODUCT_BRIEF\.md$/u,/^game-adaptations\/[^/]+\/design\/GAME_DESIGN\.md$/u,/^game-adaptations\/[^/]+\/qa\/verification\.json$/u,/^game-adaptations\/[^/]+\/build\/app\/index\.html$/u,/\.md$/u]:[/^video-recaps\/[^/]+\/work\/recap_story_plan\.json$/u,/^video-recaps\/[^/]+\/work\/narration\.json$/u,/^video-recaps\/[^/]+\/work\/assembly_manifest\.json$/u];for(let a of n){let r=t.find(s=>a.test(s.path));if(r!==void 0)return r.path}return t[0]?.path}function ha(e,o){if(e.operation==="replace-file")return e.newText;if(e.operation==="replace-text"){if(e.oldText===void 0||e.newText===void 0||e.oldText==="")return;if(e.replaceAll)return o.includes(e.oldText)?o.split(e.oldText).join(e.newText):void 0;let t=o.indexOf(e.oldText);return t<0?void 0:`${o.slice(0,t)}${e.newText}${o.slice(t+e.oldText.length)}`}if(e.operation==="insert-text"){if(e.newText===void 0)return;let t=/"insert_line"\s*:\s*(\d+)/u.exec(e.argsRaw)?.[1];if(t===void 0)return;let n=Number.parseInt(t,10),a=o.split(`
`),r=Math.max(0,Math.min(a.length,n));return a.splice(r,0,e.newText),a.join(`
`)}}function ma(e,o){return{name:e,path:o,directories:new Map,files:[]}}function ga(e,o){return e.name.localeCompare(o.name,"zh-Hans-CN",{numeric:!0})}function fa(e){let o=[...e.directories.values()].map(fa).sort(ga),t=[...e.files].sort(ga);return{kind:"directory",name:e.name,path:e.path,fileCount:t.length+o.reduce((n,a)=>n+a.fileCount,0),children:[...o,...t]}}function ya(e,o){let t=ma(o,o);for(let n of e){let r=(n.path.startsWith(`${o}/`)?n.path.slice(o.length+1):n.path).split("/").filter(g=>g!==""),s=r.pop();if(s===void 0)continue;let i=t;for(let g of r){let m=`${i.path}/${g}`,c=i.directories.get(g)??ma(g,m);i.directories.set(g,c),i=c}i.files.push({kind:"file",name:s,path:n.path,bytes:n.bytes})}return fa(t).children}var pe=require("react/jsx-runtime"),ps=["display_name","title","name","shot_id","scene_id","episode_id","character_id","location_id","view_id","prop_id","state_id","decision_id","occurrence_id","record_id","id"];function ba(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)?e:void 0}function tt(e,o){for(let t of o){let n=e[t];if(typeof n=="string"&&n.trim()!=="")return n}}function hs(e,o){let t=ba(e);if(t===void 0)return{title:typeof e=="string"?e:JSON.stringify(e)??`\u7B2C ${String(o)} \u884C`};let n=tt(t,["record_type","type","kind"]),a=ba(t.creator_acceptance),r=tt(t,["status"])??(a===void 0?void 0:tt(a,["status"]));return{title:tt(t,ps)??`\u8BB0\u5F55 ${String(o)}`,...n===void 0?{}:{type:n},...r===void 0?{}:{status:r}}}function ms(e){let o=[],t=e.replaceAll(`\r
`,`
`).split(`
`);for(let[n,a]of t.entries())if(a.trim()!=="")try{let r=JSON.parse(a);o.push({line:n+1,raw:a,value:r,...hs(r,n+1)})}catch(r){o.push({line:n+1,raw:a,title:`\u7B2C ${String(n+1)} \u884C\u683C\u5F0F\u9519\u8BEF`,error:r instanceof Error?r.message:String(r)})}return o}var _t=200;function va({content:e,label:o}){let t=ms(e);if(t.length===0)return(0,pe.jsx)("div",{className:"oh-story-markdown-empty",children:"\u8FD9\u4E2A JSONL \u6587\u4EF6\u8FD8\u662F\u7A7A\u7684\u3002"});let n=t.filter(s=>s.error===void 0).length,a=t.length-n,r=t.slice(0,_t);return(0,pe.jsxs)("section",{className:"oh-story-jsonl","aria-label":`${o} \u7ED3\u6784\u5316\u9884\u89C8`,children:[(0,pe.jsxs)("header",{className:"oh-story-jsonl-summary",children:[(0,pe.jsx)("strong",{children:a===0?`${String(n)} \u6761\u8BB0\u5F55`:`${String(n)} \u6761\u6709\u6548\u8BB0\u5F55`}),a>0&&(0,pe.jsxs)("span",{children:[String(a)," \u6761\u683C\u5F0F\u9519\u8BEF"]}),t.length>_t&&(0,pe.jsxs)("span",{children:["\u4EC5\u663E\u793A\u524D ",String(_t)," \u6761"]})]}),(0,pe.jsx)("div",{className:"oh-story-jsonl-records",children:r.map(s=>s.error===void 0?(0,pe.jsxs)("details",{open:t.length<=2,children:[(0,pe.jsxs)("summary",{children:[(0,pe.jsxs)("span",{children:["\u7B2C ",String(s.line)," \u884C"]}),(0,pe.jsx)("strong",{children:s.title}),s.type!==void 0&&(0,pe.jsx)("code",{children:s.type}),s.status!==void 0&&(0,pe.jsx)("em",{children:s.status})]}),(0,pe.jsx)("pre",{children:(0,pe.jsx)("code",{children:JSON.stringify(s.value,null,2)})})]},s.line):(0,pe.jsxs)("div",{className:"oh-story-jsonl-error",role:"alert",children:[(0,pe.jsx)("strong",{children:s.title}),(0,pe.jsx)("span",{children:s.error}),(0,pe.jsx)("pre",{children:s.raw})]},s.line))})]})}var U=require("react/jsx-runtime"),gs=/(`[^`\n]+`|\*\*[^*\n]+\*\*|~~[^~\n]+~~|\[[^\]\n]+\]\(https?:\/\/[^)\s]+\)|\*[^*\n]+\*)/gu;function yo(e,o){let t=[],n=0;for(let a of e.matchAll(gs)){let r=a[0],s=a.index;if(s>n&&t.push(e.slice(n,s)),r.startsWith("`"))t.push((0,U.jsx)("code",{children:r.slice(1,-1)},`${o}-${String(s)}`));else if(r.startsWith("**"))t.push((0,U.jsx)("strong",{children:r.slice(2,-2)},`${o}-${String(s)}`));else if(r.startsWith("~~"))t.push((0,U.jsx)("del",{children:r.slice(2,-2)},`${o}-${String(s)}`));else if(r.startsWith("*"))t.push((0,U.jsx)("em",{children:r.slice(1,-1)},`${o}-${String(s)}`));else{let i=/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/u.exec(r);t.push(i===null?r:(0,U.jsx)("a",{href:i[2],target:"_blank",rel:"noreferrer",children:i[1]},`${o}-${String(s)}`))}n=s+r.length}return n<e.length&&t.push(e.slice(n)),t}function zt(e){let o=e.trim();o.startsWith("|")&&(o=o.slice(1)),o.endsWith("|")&&(o=o.slice(0,-1));let t=[],n="";for(let a=0;a<o.length;a+=1){let r=o[a]??"";r==="\\"&&o[a+1]==="|"?(n+="|",a+=1):r==="|"?(t.push(n.trim()),n=""):n+=r}return t.push(n.trim()),t}function xa(e){let o=zt(e);if(!(o.length===0||!o.every(t=>/^:?-{3,}:?$/u.test(t))))return o.map(t=>{if(t.startsWith(":")&&t.endsWith(":"))return"center";if(t.endsWith(":"))return"right";if(t.startsWith(":"))return"left"})}function fs(e,o){let t=e[o]??"";return/^(`{3,}|~{3,})\s*[\w-]*\s*$/u.test(t)||/^#{1,6}\s+/u.test(t)||/^(?:-{3,}|\*{3,}|_{3,})\s*$/u.test(t)||/^>\s?/u.test(t)||/^[-*+]\s+/u.test(t)||/^\d+[.)]\s+/u.test(t)||t.includes("|")&&xa(e[o+1]??"")!==void 0}var ys=/^(`{3,}|~{3,})\s*[\w-]*\s*$/u;function bs(e){let o=[],t,n=!1;for(let a of e){if(t!==void 0){o.push(a),new RegExp(`^${t[0]??"`"}{${String(t.length)},}\\s*$`,"u").test(a)&&(t=void 0);continue}if(!n&&ys.test(a)){t=/^(`{3,}|~{3,})/u.exec(a)?.[1],o.push(a);continue}let r="",s=a;for(;s!=="";){if(n){let m=s.indexOf("-->");if(m<0)break;s=s.slice(m+3),n=!1;continue}let i=/`[^`\n]+`/u.exec(s),g=s.indexOf("<!--");if(g<0){r+=s;break}if(i!==null&&i.index<g){r+=s.slice(0,i.index+i[0].length),s=s.slice(i.index+i[0].length);continue}r+=s.slice(0,g),s=s.slice(g+4),n=!0}o.push(r===a?a:r.trimEnd())}return o}function vs(e){let o=bs(e.replaceAll(`\r
`,`
`).split(`
`)),t=[];for(let n=0;n<o.length;){let a=o[n]??"";if(a.trim()===""){n+=1;continue}let r=/^(`{3,}|~{3,})\s*([\w-]*)\s*$/u.exec(a);if(r!==null){let f=r[1]??"```",I=f[0]??"`",w=new RegExp(`^${I}{${String(f.length)},}\\s*$`,"u"),u=[];for(n+=1;n<o.length&&!w.test(o[n]??"");)u.push(o[n]??""),n+=1;n<o.length&&(n+=1),t.push({kind:"code",lines:u,...r[2]===void 0||r[2]===""?{}:{language:r[2]}});continue}let s=/^(#{1,6})\s+(.+)$/u.exec(a);if(s!==null){t.push({kind:"heading",text:s[2]??"",level:s[1]?.length??1}),n+=1;continue}if(/^(?:-{3,}|\*{3,}|_{3,})\s*$/u.test(a)){t.push({kind:"rule"}),n+=1;continue}let i=a.includes("|")?xa(o[n+1]??""):void 0;if(i!==void 0){let f=zt(a),I=[];for(n+=2;n<o.length&&(o[n]??"").includes("|")&&(o[n]??"").trim()!=="";)I.push(zt(o[n]??"")),n+=1;t.push({kind:"table",headers:f,rows:I,alignments:i});continue}if(/^>\s?/u.test(a)){let f=[];for(;n<o.length&&/^>\s?/u.test(o[n]??"");)f.push((o[n]??"").replace(/^>\s?/u,"")),n+=1;t.push({kind:"quote",lines:f});continue}let g=/^[-*+]\s+(.+)$/u.exec(a),m=/^(\d+)[.)]\s+(.+)$/u.exec(a);if(g!==null||m!==null){let f=g!==null?"ul":"ol",I=[],w=f==="ul"?/^[-*+]\s+(.+)$/u:/^\d+[.)]\s+(.+)$/u,u=m===null?void 0:Number(m[1]);for(;n<o.length;){let b=w.exec(o[n]??"");if(b===null)break;let R=b[1]??"",C=/^\[([ xX])\]\s+(.+)$/u.exec(R);I.push(C===null?{text:R}:{text:C[2]??"",checked:C[1]?.toLocaleLowerCase()==="x"}),n+=1}t.push({kind:f,items:I,...u===void 0?{}:{start:u}});continue}let c=[a];for(n+=1;n<o.length;){let f=o[n]??"";if(f.trim()===""||fs(o,n))break;c.push(f),n+=1}t.push({kind:"paragraph",lines:c})}return t}function xs({block:e,blockKey:o}){let t=yo(e.text,o);switch(e.level){case 1:return(0,U.jsx)("h1",{children:t});case 2:return(0,U.jsx)("h2",{children:t});case 3:return(0,U.jsx)("h3",{children:t});case 4:return(0,U.jsx)("h4",{children:t});case 5:return(0,U.jsx)("h5",{children:t});default:return(0,U.jsx)("h6",{children:t})}}function bo({content:e,label:o}){let t=vs(e);return t.length===0?(0,U.jsx)("div",{className:"oh-story-markdown-empty",children:"\u8FD9\u4E2A Markdown \u6587\u4EF6\u8FD8\u662F\u7A7A\u7684\u3002"}):(0,U.jsx)("article",{className:"oh-story-markdown","aria-label":`${o} \u6E32\u67D3\u9884\u89C8`,children:t.map((n,a)=>{let r=`block-${String(a)}`;if(n.kind==="code")return(0,U.jsx)("pre",{children:(0,U.jsx)("code",{"data-language":n.language,children:n.lines.join(`
`)})},r);if(n.kind==="rule")return(0,U.jsx)("hr",{},r);if(n.kind==="quote")return(0,U.jsx)("blockquote",{children:n.lines.map((s,i)=>(0,U.jsx)("p",{children:yo(s,`${r}-${String(i)}`)},`${r}-${String(i)}`))},r);if(n.kind==="ul"||n.kind==="ol"){let s=n.items.map((i,g)=>(0,U.jsxs)("li",{className:i.checked===void 0?void 0:"oh-story-task-item",children:[i.checked===void 0?null:(0,U.jsx)("input",{type:"checkbox",checked:i.checked,readOnly:!0,disabled:!0,"aria-label":i.checked?"\u5DF2\u5B8C\u6210":"\u672A\u5B8C\u6210"}),yo(i.text,`${r}-${String(g)}`)]},`${r}-${String(g)}`));return n.kind==="ul"?(0,U.jsx)("ul",{children:s},r):(0,U.jsx)("ol",{start:n.start,children:s},r)}return n.kind==="table"?(0,U.jsx)("div",{className:"oh-story-markdown-table",children:(0,U.jsxs)("table",{children:[(0,U.jsx)("thead",{children:(0,U.jsx)("tr",{children:n.headers.map((s,i)=>(0,U.jsx)("th",{style:{textAlign:n.alignments[i]},children:yo(s,`${r}-h-${String(i)}`)},`${r}-h-${String(i)}`))})}),(0,U.jsx)("tbody",{children:n.rows.map((s,i)=>(0,U.jsx)("tr",{children:n.headers.map((g,m)=>(0,U.jsx)("td",{style:{textAlign:n.alignments[m]},children:yo(s[m]??"",`${r}-r-${String(i)}-${String(m)}`)},`${r}-r-${String(i)}-${String(m)}`))},`${r}-r-${String(i)}`))})]})},r):n.kind==="heading"?(0,U.jsx)(xs,{block:n,blockKey:r},r):n.kind==="paragraph"?(0,U.jsx)("p",{children:n.lines.map((s,i)=>(0,U.jsxs)("span",{children:[i===0?null:(0,U.jsx)("br",{}),yo(s,`${r}-${String(i)}`)]},`${r}-${String(i)}`))},r):null})})}var ws="short-drama/v1",ka=new Set(["\u5267\u672C.md","\u89C6\u89C9\u8BBE\u5B9A.md","\u5206\u955C.md","\u56FE\u7247\u63D0\u793A\u8BCD.md","\u89C6\u9891\u63D0\u793A\u8BCD.md"]);function vo(e){return e===void 0?void 0:/^(剧集\/[^/]+)\/[^/]+$/u.exec(e)?.[1]}function jt(e){let o=vo(e),t=e.split("/").at(-1);return o!==void 0&&t!==void 0&&ka.has(t)}function Ca(e,o){return e.map(t=>t.path).filter(t=>t.startsWith(`${o}/`)&&ka.has(t.slice(o.length+1))).sort((t,n)=>wa(t)-wa(n)||t.localeCompare(n,"zh-Hans-CN"))}function Pa(e,o){let t=`${o}/\u5206\u955C.md`,n=`${o}/\u56FE\u7247\u63D0\u793A\u8BCD.md`,a=`${o}/\u89C6\u9891\u63D0\u793A\u8BCD.md`,r=`${o}/\u89C6\u89C9\u8BBE\u5B9A.md`,s=ks(t,e[t]??""),i=Cs(n,e[n]??""),g=Ps(a,e[a]??""),m=Ss(r,e[r]??""),c=new Map(g.flatMap(b=>b.shotId===void 0?[]:[[b.shotId,b]])),f=s.map(b=>({...b,motion:c.get(b.id)})),I=new Map;for(let b of[...f,...i,...g,...m])I.set(b.id,{path:b.path,offset:b.offset,id:b.id});let w=`${o}/\u5267\u672C.md`;for(let b of f)for(let R of Ta(b)){let C=Ea(w,e[w]??"",R);C!==void 0&&I.set(R,C)}let u=Is({documents:e,episodeDirectory:o,shots:f,assets:i,visualAssets:m,motions:g});return{protocolVersion:ws,episodeDirectory:o,shots:f,assets:i,visualAssets:m,motions:g,targets:I,documentPaths:Object.keys(e).filter(b=>b.startsWith(`${o}/`)),diagnostics:u}}function ks(e,o){return Ao(o).flatMap(t=>{let n=/^(SHOT-[A-Z0-9-]+)\s*(?:[·｜|]\s*)?(.*)$/iu.exec(t.heading.trim());if(n===null||n[1]===void 0)return[];let a=at(t.body),r=n[1].toLocaleUpperCase(),s=Te(a,"\u6765\u6E90","\u573A\u6B21");return[{id:r,title:n[2]?.trim()||r,path:e,offset:t.offset,source:s,sceneIds:Rs(s),durationSeconds:Ia(Te(a,"\u65F6\u957F")),purpose:Te(a,"\u76EE\u7684","\u955C\u5934\u76EE\u7684"),shotSpec:Te(a,"\u666F\u522B/\u673A\u4F4D","\u666F\u522B","\u955C\u5934\u89C4\u683C"),start:Te(a,"\u8D77\u70B9","\u8D77\u59CB"),end:Te(a,"\u7EC8\u70B9","\u7ED3\u675F"),references:Ns(Te(a,"\u56FE\u7247\u63D0\u793A\u8BCD\u9879","\u53C2\u8003","\u5173\u8054\u8D44\u4EA7")),keyframePrompt:nt(t.body,"\u9996\u5E27\u63D0\u793A\u8BCD")??nt(t.body,"\u51BB\u7ED3\u5173\u952E\u5E27\u63D0\u793A\u8BCD")}]})}function Cs(e,o){return Ao(o).flatMap(t=>{let n=/^(IMG-[A-Z0-9-]+)\s*(?:[·｜|]\s*)?(.*)$/iu.exec(t.heading.trim());if(n===null||n[1]===void 0)return[];let a=at(t.body),r=n[1].toLocaleUpperCase(),s=n[2]?.trim()||r;return[{id:r,title:s,kind:Na(`${r} ${s} ${Te(a,"\u7528\u9014")??""}`),path:e,offset:t.offset,purpose:Te(a,"\u7528\u9014"),reference:Te(a,"\u53C2\u8003","\u53C2\u8003\u7EA6\u675F"),prompt:nt(t.body,"\u53EF\u590D\u5236\u63D0\u793A\u8BCD")}]})}function Ps(e,o){return Ao(o).flatMap(t=>{let n=/^(MOTION-[A-Z0-9-]+)\s*(?:[·｜|]\s*)?(.*)$/iu.exec(t.heading.trim());if(n===null||n[1]===void 0)return[];let a=at(t.body),r=n[1].toLocaleUpperCase(),s=Te(a,"\u5206\u955C","\u955C\u5934")?.match(/SHOT-[A-Z0-9-]+/iu)?.[0]?.toLocaleUpperCase();return[{id:r,title:n[2]?.trim()||r,path:e,offset:t.offset,shotId:s,durationSeconds:Ia(Te(a,"\u65F6\u957F")),startFrame:Te(a,"\u8D77\u59CB\u5E27","\u5F00\u573A\u753B\u9762","\u8D77\u70B9"),end:Te(a,"\u7EC8\u70B9","\u52A8\u4F5C\u8FC7\u7A0B","\u7ED3\u675F"),prompt:nt(t.body,"\u53EF\u590D\u5236\u63D0\u793A\u8BCD")}]})}function Ss(e,o){return Ao(o).flatMap(t=>{let n=/^(人物|角色|造型|地点|场景|道具|状态)\s*(?:[·｜|:]\s*)?(.*)$/u.exec(t.heading.trim());if(n===null||n[1]===void 0)return[];let a=at(t.body),r=n[2]?.trim()||t.heading.trim(),s=Te(a,"ID","\u8D44\u4EA7 ID","\u8D44\u4EA7ID")?.trim().toLocaleUpperCase(),i=s!==void 0&&/^VISUAL-[A-Z0-9-]+$/u.test(s);return[{id:i?s:`VISUAL-${Ts(`${n[1]}-${r}`)}`,title:r,kind:Na(`${n[1]} ${r}`),path:e,offset:t.offset,description:t.body.trim(),stableId:i,declaredId:s}]})}function Is(e){let o=[],t=c=>{o.push({...c,line:Es(e.documents[c.path]??"",c.offset)})},n=[...e.shots,...e.assets,...e.visualAssets,...e.motions],a=new Map;for(let c of n)a.set(c.id,[...a.get(c.id)??[],c]);for(let[c,f]of a)if(!(f.length<2))for(let I of f)t({severity:"error",code:"duplicate_id",path:I.path,offset:I.offset,targetId:c,message:`${c} \u5728\u5F53\u524D\u96C6\u5185\u91CD\u590D\uFF0C\u540E\u51FA\u73B0\u7684\u6761\u76EE\u4F1A\u906E\u853D\u524D\u4E00\u6761\u3002`});for(let c of e.visualAssets)c.stableId||t(c.declaredId===void 0?{severity:"warning",code:"generated_visual_id",path:c.path,offset:c.offset,targetId:c.id,message:`${c.title} \u7F3A\u5C11\u7A33\u5B9A\u7684 \u201C- ID\uFF1AVISUAL-*\u201D\uFF1B\u4FEE\u6539\u6807\u9898\u4F1A\u6539\u53D8\u753B\u5E03\u8282\u70B9\u8EAB\u4EFD\u3002`}:{severity:"warning",code:"invalid_visual_id",path:c.path,offset:c.offset,targetId:c.id,message:`${c.title} \u7684 \u201C- ID\uFF1A${c.declaredId}\u201D \u683C\u5F0F\u65E0\u6548\uFF0C\u5DF2\u56DE\u9000\u4E3A\u6309\u6807\u9898\u751F\u6210\u7684 ID\uFF1B\u8BF7\u5199\u6210 VISUAL- \u52A0\u5927\u5199\u5B57\u6BCD\u3001\u6570\u5B57\u6216\u8FDE\u5B57\u7B26\u3002`});let r=new Set([...e.assets,...e.visualAssets,...e.shots,...e.motions].map(c=>c.id)),s=`${e.episodeDirectory}/\u5267\u672C.md`;for(let c of e.shots){for(let f of c.references)r.has(f)||t({severity:"warning",code:"unknown_reference",path:c.path,offset:c.offset,targetId:c.id,message:`${c.id} \u5F15\u7528\u4E86\u672A\u89E3\u6790\u7684 ${f}\u3002`});for(let f of Ta(c))Ea(s,e.documents[s]??"",f)===void 0&&t({severity:"warning",code:"unknown_source",path:c.path,offset:c.offset,targetId:c.id,message:`${c.id} \u7684\u6765\u6E90 ${f} \u5728\u5267\u672C\u4E2D\u4E0D\u5B58\u5728\u3002`})}let i=new Set(e.shots.map(c=>c.id)),g=new Map;for(let c of e.motions){if(c.shotId===void 0){t({severity:"warning",code:"motion_without_shot",path:c.path,offset:c.offset,targetId:c.id,message:`${c.id} \u6CA1\u6709\u53EF\u89E3\u6790\u7684 SHOT-* \u5206\u955C\u5B57\u6BB5\u3002`});continue}i.has(c.shotId)||t({severity:"error",code:"unknown_motion_shot",path:c.path,offset:c.offset,targetId:c.id,message:`${c.id} \u6307\u5411\u4E0D\u5B58\u5728\u7684 ${c.shotId}\u3002`}),g.set(c.shotId,[...g.get(c.shotId)??[],c])}for(let[c,f]of g)if(!(f.length<2))for(let I of f)t({severity:"error",code:"multiple_motions",path:I.path,offset:I.offset,targetId:I.id,message:`${c} \u540C\u65F6\u7ED1\u5B9A\u4E86\u591A\u4E2A MOTION\uFF0C\u753B\u5E03\u53EA\u80FD\u786E\u5B9A\u4E00\u4E2A\u3002`});let m=new Set([...e.shots,...e.assets,...e.motions].map(c=>`${c.path}:${String(c.offset)}`));for(let[c,f]of[[`${e.episodeDirectory}/\u5206\u955C.md`,"SHOT"],[`${e.episodeDirectory}/\u56FE\u7247\u63D0\u793A\u8BCD.md`,"IMG"],[`${e.episodeDirectory}/\u89C6\u9891\u63D0\u793A\u8BCD.md`,"MOTION"]])for(let I of Ao(e.documents[c]??"")){let w=I.heading.trim();w.toLocaleUpperCase().startsWith(f)&&!m.has(`${c}:${String(I.offset)}`)&&t({severity:"error",code:"malformed_heading",path:c,offset:I.offset,message:`\u65E0\u6CD5\u89E3\u6790\u6807\u9898 \u201C${w}\u201D\uFF0C\u9700\u8981\u7A33\u5B9A\u7684 ${f}-* ID\u3002`}),f==="MOTION"&&w.toLocaleUpperCase().startsWith("GROUP")&&!/^GROUP-[A-Z0-9-]+(?:\s*(?:[·｜|]|$))/iu.test(w)&&t({severity:"error",code:"malformed_heading",path:c,offset:I.offset,message:`\u65E0\u6CD5\u89E3\u6790\u6807\u9898 \u201C${w}\u201D\uFF0C\u9700\u8981\u7A33\u5B9A\u7684 GROUP-* ID\u3002`})}return o.sort((c,f)=>c.path.localeCompare(f.path,"zh-Hans-CN")||c.offset-f.offset||c.code.localeCompare(f.code))}function Sa(e){let o=!!e.keyframePrompt?.trim(),t=!!e.motion?.prompt?.trim(),n=e.references.length>0;return{keyframe:o,motion:t,references:n,complete:o&&t}}function Ao(e){let o=[...e.matchAll(/^##\s+(.+)\s*$/gmu)];return o.map((t,n)=>{let a=(t.index??0)+t[0].length,r=o[n+1]?.index??e.length;return{heading:t[1]??"",body:e.slice(a,r),offset:t.index??0}})}function at(e){let o=new Map;for(let t of e.matchAll(/^\s*[-*]\s+([^：:\n]+)[：:]\s*(.+?)\s*$/gmu)){let n=t[1]?.trim(),a=t[2]?.trim();n!==void 0&&a!==void 0&&o.set(n,a)}return o}function Te(e,...o){for(let t of o){let n=e.get(t);if(n!==void 0&&n!=="")return n}}function nt(e,o){let t=o.replace(/[.*+?^${}()|[\]\\]/gu,"\\$&"),n=new RegExp(`^###\\s+${t}\\s*$([\\s\\S]*?)(?=^###\\s+|(?![\\s\\S]))`,"imu").exec(e);if(n?.[1]===void 0)return;let r=n[1].split(/\r?\n/u).filter(s=>/^\s*>/u.test(s)).map(s=>s.replace(/^\s*>\s?/u,"").trimEnd()).join(`
`).trim();return r===""?void 0:r}function Ia(e){if(e===void 0)return;let o=/([0-9]+(?:\.[0-9]+)?)\s*(?:s|秒)/iu.exec(e);if(o?.[1]===void 0)return;let t=Number(o[1]);return Number.isFinite(t)&&t>0?t:void 0}function Ns(e){if(e===void 0)return[];let o=e.match(/(?:IMG|SHOT|MOTION)-[A-Z0-9-]+/giu)??[];return[...new Set(o.map(t=>t.toLocaleUpperCase()))]}function Na(e){return/(人物|角色|外貌|造型(?!状态)|character|portrait|sheet)/iu.test(e)?"character":/(地点|场景|环境|空间布局|scene|location|corridor|room|plate)/iu.test(e)?"scene":/(道具|物件|主体|prop|object)/iu.test(e)?"prop":/(造型状态|状态|state|look)/iu.test(e)?"state":"unknown"}function Ts(e){return e.trim().toLocaleUpperCase().replace(/[^\p{Letter}\p{Number}]+/gu,"-").replace(/^-|-$/gu,"")||"ITEM"}function Es(e,o){return e.slice(0,Math.max(0,o)).split(/\r?\n/u).length}function Rs(e){return e===void 0?[]:[...new Set([...e.matchAll(/(?:[A-Za-z0-9]+-)+SC[0-9]+/gu)].map(o=>o[0]))]}function Ta(e){return e.sceneIds.length>0?e.sceneIds:e.source===void 0?[]:[e.source]}function Ea(e,o,t){let n=o.search(new RegExp(`^##\\s+${t.replace(/[.*+?^${}()|[\]\\]/gu,"\\$&")}(?:\\s|$)`,"imu"));return n<0?void 0:{path:e,offset:n,id:t}}function wa(e){let o=e.split("/").at(-1);return["\u5267\u672C.md","\u89C6\u89C9\u8BBE\u5B9A.md","\u5206\u955C.md","\u56FE\u7247\u63D0\u793A\u8BCD.md","\u89C6\u9891\u63D0\u793A\u8BCD.md"].indexOf(o??"")}function Me(e,o,t){if(o==="BATCH-KEYFRAMES")return"\u6279\u91CF\u5173\u952E\u5E27";if(o==="BATCH-VIDEOS")return"\u6279\u91CF\u955C\u5934\u89C6\u9891";if(e===void 0)return o;if(o===e.episodeDirectory)return"\u672C\u96C6\u6210\u7247";let n=e.shots.find(r=>r.id===o)?.title??e.assets.find(r=>r.id===o)?.title??e.visualAssets.find(r=>r.id===o)?.title??e.motions.find(r=>r.id===o)?.title;if(n!==void 0)return n;let a=t?.[`${e.episodeDirectory}/\u5267\u672C.md`];if(a!==void 0){let r=new RegExp(`^##\\s+${o.replace(/[.*+?^${}()|[\]\\]/gu,"\\$&")}(?:\\s*[\xB7\uFF5C|]?\\s*(.*))?$`,"imu").exec(a)?.[1]?.trim();if(r)return r}return o}var be=require("react");function We(e,o,t,n){let a=o.indexOf(t);if(a<0)return;let r;if(e.key==="Home"?r=0:e.key==="End"?r=o.length-1:e.key==="ArrowRight"?r=(a+1)%o.length:e.key==="ArrowLeft"&&(r=(a-1+o.length)%o.length),r===void 0)return;e.preventDefault();let s=o[r];s!==void 0&&(n(s),e.currentTarget.parentElement?.querySelectorAll("[role='tab']")[r]?.focus())}function he(e,o,t){let n=new URL(`/oh-story/${e}`,globalThis.location.origin);return n.searchParams.set("sessionId",o),t!==void 0&&n.searchParams.set("path",t),n.toString()}var Qt=require("react");function Lt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)?e:void 0}function Ra(e,o=new Set){return Array.isArray(e)?e.flatMap(t=>{let n=Lt(t);if(n===void 0||typeof n.id!="string"||!Array.isArray(n.content))return[];let a=Lt(n.source);if(a?.kind==="user"&&typeof a.rpcId=="string"&&o.has(a.rpcId))return[];let r=n.content.flatMap(s=>{let i=Lt(s);return i?.type==="text"&&typeof i.text=="string"?[i.text]:[]}).join(" ");return[{id:n.id,preview:r}]}):[]}function xo(e){return{id:e.id,targetId:e.targetId,kind:e.kind,status:"pending",progress:0,prompt:e.prompt,expectedOutputs:Math.max(1,Math.floor(e.expectedOutputs??1)),completedOutputs:0,outputPath:e.outputPath,supersededOutputIds:e.supersededOutputIds}}function He(e,o,t,n){let a=o.filter(r=>r.targetId===e&&(n===void 0||r.kind===n));return a.find(r=>r.id===t[e])??a.at(-1)}var Ds=/(?:^|\/)制作成果\/成片\//u;function Da(e,o){if(Ds.test(e))return;let n=e.toLocaleUpperCase().split("/"),a=n.at(-1)??"";return[...o].sort((r,s)=>s.length-r.length).find(r=>{let s=r.toLocaleUpperCase();return n.includes(s)||a===s||a.startsWith(`${s}.`)||a.startsWith(`${s}-`)})}function $s(e,o){if(e.path===void 0||o.trim()==="")return!1;let t=o.replace(/[.*+?^${}()|[\]\\]/gu,"\\$&"),n=e.path.split("/").at(-1)??"";return new RegExp(`(?:^|[-_.])${t}(?:[-_.]|$)`,"u").test(n)}function Ms(e,o){if(e.outputPath===void 0)return o.filter(n=>$s(n,e.id));let t=new Set(e.supersededOutputIds??[]);return o.filter(n=>n.path===e.outputPath&&!t.has(n.id))}function $a(e){return e.some(o=>o.kind==="composition"&&(o.status==="awaiting_confirmation"||o.status==="pending"||o.status==="running"))}function Os(e,o){return o.kind!=="composition"?[...e]:e.map(t=>t.id!==o.id&&t.kind==="composition"&&t.status==="dispatched_unknown"&&(t.targetId===o.targetId||t.outputPath!==void 0&&t.outputPath===o.outputPath)?{...t,status:"failed"}:t)}function Ma(e,o,t,n,a=t,r={}){let s=o.shots.find(m=>m.id===e);if(s===void 0)return[];let i=s.references.flatMap(m=>{let c=He(m,t,n,"image");return c===void 0?[]:[c]}),g=(r[e]??[]).flatMap(m=>{let c=a.find(f=>f.id===m&&f.kind==="image");return c===void 0?[]:[c]});return[...new Map([...i,...g].map(m=>[m.id,m])).values()]}function rt(e,o){if(e===void 0||e.startsWith(`${o}/`))return!0;let t=o.split("/").at(-1);return t!==void 0&&e.startsWith(`\u4EA4\u4ED8/${t}/`)}function Gt(e,o){return o.kind==="video"?o.targetId===e:o.targetId===e||o.targetId.startsWith("IMG-")}function Wo(e,o){if(e.trim()==="")return;let t=e.replace(/[.*+?^${}()|[\]\\]/gu,"\\$&"),n=new RegExp(`\u4EFB\u52A1\\s*ID\\s*[\uFF1A:]\\s*${t}(?:[\\s.,;\u3001\u3002]|$)`,"u");return o.find(a=>n.test(a.preview))}function Oa(e,o,t){if(t)return[...e].reverse().find(n=>(n.status==="awaiting_confirmation"||n.status==="pending"||n.status==="running")&&Wo(n.id,o)===void 0)?.id}function Va(e,o,t,n){let a=[...e].reverse().find(i=>i.status==="pending"&&Wo(i.id,o)===void 0),r=i=>i.filter(g=>g.kind==="composition"&&g.status==="running").reduce((g,m)=>Os(g,m),[...i]),s=r(e).map(i=>{let g=Wo(i.id,o)!==void 0;if(i.status==="canceled"||i.status==="succeeded"||i.status==="failed"&&i.outputPath!==void 0)return i;let m=Ms(i,n);return m.length>=i.expectedOutputs?{...i,status:"succeeded",progress:100,completedOutputs:m.length,output:m[0],error:void 0}:i.status==="awaiting_confirmation"&&m.length===0?i:i.status==="running"&&g?{...i,status:"pending",progress:0}:i.status==="pending"&&t&&!g&&i===a?{...i,status:"running",progress:Math.max(10,i.progress),error:void 0}:!t&&!g&&(i.status==="running"||i.status==="dispatched_unknown")?{...i,status:"dispatched_unknown",progress:Math.round(m.length/i.expectedOutputs*100),completedOutputs:m.length,error:m.length>0?`DSH Turn \u5DF2\u7ED3\u675F\uFF0C\u5DF2\u53D1\u73B0 ${String(m.length)}/${String(i.expectedOutputs)} \u9879\u6210\u679C\uFF1B\u8BF7\u5237\u65B0\u6838\u5BF9\u5269\u4F59\u8F93\u51FA\u3002`:i.kind==="composition"?"\u6210\u7247\u672A\u751F\u6210\uFF1A\u8BF7\u5728 Chat \u67E5\u770B edit_tool check \u7684\u963B\u65AD\u9879\uFF08\u672A\u91C7\u7528\u955C\u5934\u7406\u7531\u3001\u753B\u5E45/\u5E27\u7387\u4E0D\u4E00\u81F4\u7B49\uFF09\uFF0C\u4FEE\u6B63\u540E\u518D\u5408\u6210\u3002":"DSH Turn \u5DF2\u7ED3\u675F\uFF0C\u5C1A\u672A\u53D1\u73B0\u5173\u8054\u6210\u679C\u3002\u4EFB\u52A1\u53EF\u80FD\u5DF2\u6D3E\u53D1\uFF0C\u8BF7\u5148\u5237\u65B0\u6210\u679C\uFF0C\u907F\u514D\u91CD\u590D\u8BA1\u8D39\u3002"}:m.length>0?{...i,status:i.status==="failed"?"failed":"running",progress:Math.max(10,Math.round(m.length/i.expectedOutputs*100)),completedOutputs:m.length,error:i.status==="failed"?i.error:void 0}:i});return r(s)}function Aa(e,o,t,n,a){let r=a===void 0?t:t.filter(c=>rt(c.path,a)),s=new Set(e),i=o.filter(c=>s.has(c.shotId)),g=new Set(i.map(c=>c.shotId)),m=e.filter(c=>!g.has(c)).map(c=>({shotId:c}));return[...i,...m].map(c=>{if(c.sourceVersionId!==void 0){let C=r.find(T=>T.id===c.sourceVersionId&&Gt(c.shotId,T));return{...c,versionId:C?.id}}let f=He(c.shotId,r,n,"video"),I=n[c.shotId],w=I===void 0?void 0:r.find(C=>C.id===I&&C.kind==="image"&&(C.targetId===c.shotId||C.targetId.startsWith("IMG-"))),u=He(c.shotId,r,n,"image"),b=r.find(C=>C.id===c.versionId&&C.kind==="image"&&C.targetId.startsWith("IMG-")),R=w??u??b;return{shotId:c.shotId,versionId:f?.id??R?.id}})}function Ft(e,o,t){let n=new Map(o.filter(r=>t===void 0||rt(r.path,t)).map(r=>[r.id,r])),a=[];for(let r of e){let s=r.versionId===void 0?void 0:n.get(r.versionId);s===void 0||s.kind!=="video"&&s.kind!=="image"?a.push(r.sourceVersionId===void 0?`${r.shotId} \u7F3A\u5C11\u5DF2\u9009\u89C6\u9891\u6216\u5173\u952E\u5E27\u7D20\u6750`:`${r.shotId} \u663E\u5F0F\u9009\u62E9\u7684\u6210\u7247\u7D20\u6750\u5DF2\u4E0D\u53EF\u7528`):s.path===void 0&&a.push(`${r.shotId} \u7684${s.kind==="video"?"\u89C6\u9891":"\u5173\u952E\u5E27"}\u6CA1\u6709\u53EF\u4F9B DSH \u8BFB\u53D6\u7684\u5DE5\u4F5C\u533A\u8DEF\u5F84`)}return a}function Wa(e,o,t){if(!Number.isInteger(o)||!Number.isInteger(t))return[...e];if(o<0||t<0||o>=e.length||t>=e.length||o===t)return[...e];let n=[...e],[a]=n.splice(o,1);return a!==void 0&&n.splice(t,0,a),n}var it={x:0,y:0,zoom:.65},Ht=40,Vs=.65;function _a(e){return Math.min(3,Math.max(.01,e))}function st(e,o,t){let n=_a(e.zoom*o),a=n/e.zoom;return{x:t.x-(t.x-e.x)*a,y:t.y-(t.y-e.y)*a,zoom:n}}function za(e,o){let t=o===1?e*16:o===2?e*800:e;return Math.exp(-t*.001)}function qt(e,o,t){return{x:t.width/2-(o.x+o.width/2)*e.zoom,y:t.height/2-(o.y+o.height/2)*e.zoom,zoom:e.zoom}}function Bt(e,o,t){let n=o.x*e.zoom+e.x,a=o.y*e.zoom+e.y;return n>=0&&a>=0&&n+o.width*e.zoom<=t.width&&a+o.height*e.zoom<=t.height}function _o(e,o,t=it){if(e.length===0||o.width<=0||o.height<=0)return t;let n=Math.min(...e.map(c=>c.x)),a=Math.min(...e.map(c=>c.y)),r=Math.max(...e.map(c=>c.x+c.width)),s=Math.max(...e.map(c=>c.y+c.height)),i=(o.width-Ht*2)/Math.max(1,r-n),g=(o.height-Ht*2)/Math.max(1,s-a),m=_a(Math.min(1,i,g));return{x:(o.width-(r-n)*m)/2-n*m,y:(o.height-(s-a)*m)/2-a*m,zoom:m}}function ja(e,o,t=it){if(e.length===0||o.width<=0||o.height<=0)return t;let n=_o(e,o,t),a=Math.max(Vs,n.zoom),r=Math.min(...e.map(g=>g.x)),s=Math.min(...e.map(g=>g.y)),i=Math.max(...e.map(g=>g.x+g.width));return{x:o.width/2-(r+(i-r)/2)*a,y:Ht-s*a,zoom:a}}var Ut={width:260,height:210},Jt={width:248,height:282},La={width:292,height:310},dt={x:80,y:80},As=36,Ws=40,Ga=180,_s={character:"\u4EBA\u7269\u53C2\u8003",scene:"\u573A\u666F\u53C2\u8003",prop:"\u9053\u5177\u53C2\u8003",state:"\u72B6\u6001\u53C2\u8003",unknown:"\u89C6\u89C9\u8BBE\u5B9A"};function Yt(e,o={}){let t=`${e.episodeDirectory}/\u5267\u672C.md`,n=Gs(t,o[t]),r=zs([...n.map(C=>C.id),...e.shots.flatMap(C=>C.sceneIds.length>0?C.sceneIds:C.source===void 0?[]:[C.source])]).map((C,T)=>{let O=e.shots.filter(ee=>ee.sceneIds.includes(C)||ee.sceneIds.length===0&&ee.source===C),Q=n.find(ee=>ee.id===C),X=e.targets.get(C)??Q?.target,ge=Q??Ls(X,o);return{id:C,title:ge?.title.replace(/^[A-Z0-9]+-SC\d+\s*[·｜|]?\s*/iu,"")||`\u573A\u6B21 ${String(T+1)}`,kind:"story",eyebrow:"\u5267\u672C\u573A\u6B21",description:ge?.body??(O.length===0?void 0:`\u5EF6\u5C55\u4E3A ${String(O.length)} \u4E2A\u955C\u5934`),target:X}}),s=new Set(e.assets.map(C=>C.title)),g=[...e.assets.map(C=>({id:C.id,title:C.title,kind:C.kind,description:C.purpose??C.reference,prompt:C.prompt,target:e.targets.get(C.id)})),...e.visualAssets.filter(C=>!s.has(C.title)).map(C=>({id:C.id,title:C.title,kind:C.kind,description:C.description,prompt:C.description,target:e.targets.get(C.id)}))].map(C=>({...C,kind:"asset",eyebrow:_s[C.kind]})),m=e.shots.map((C,T)=>({id:C.id,title:C.title,kind:"shot",eyebrow:`${String(T+1).padStart(2,"0")} \xB7 \u955C\u5934${C.durationSeconds===void 0?"":` \xB7 ${String(C.durationSeconds)}s`}`,description:C.purpose??C.shotSpec??C.start,prompt:C.keyframePrompt,videoPrompt:C.motion?.prompt,target:e.targets.get(C.id)})),c=Kt(r.length,dt,Ut,1),I={x:Fa(c,Ut,dt.x)+Ga,y:dt.y},w=Kt(g.length,I,Jt,2),b={x:Fa(w,Jt,I.x)+Ga,y:dt.y},R=Kt(m.length,b,La,3);return[...r.map((C,T)=>({...C,initial:c[T],...Ut})),...g.map((C,T)=>({...C,initial:w[T],...Jt})),...m.map((C,T)=>({...C,initial:R[T],...La}))]}function Ha(e,o){let t=o??new Set(Yt(e).map(a=>a.id)),n=[];for(let[a,r]of e.shots.entries()){let s=r.sceneIds.length>0?r.sceneIds:r.source===void 0?[]:[r.source];for(let g of s)t.has(g)&&n.push({from:g,to:r.id,kind:"story",label:"\u6545\u4E8B\u91CC\u7684\u955C\u5934"});for(let g of r.references)t.has(g)&&n.push({from:g,to:r.id,kind:"reference",label:"\u753B\u9762\u53C2\u8003"});let i=e.shots[a+1];i!==void 0&&n.push({from:r.id,to:i.id,kind:"sequence",label:"\u63A5\u7740\u53D1\u751F"})}return js(n,a=>`${a.kind}:${a.from}:${a.to}`)}function Kt(e,o,t,n){let a=Math.max(1,Math.floor(n));return Array.from({length:e},(r,s)=>({x:o.x+s%a*(t.width+As),y:o.y+Math.floor(s/a)*(t.height+Ws)}))}function Fa(e,o,t){return e.length===0?t:Math.max(...e.map(n=>n.x+o.width))}function zs(e){return[...new Set(e)]}function js(e,o){let t=new Set;return e.filter(n=>{let a=o(n);return t.has(a)?!1:(t.add(a),!0)})}function Ls(e,o){if(e===void 0)return;let t=o[e.path];if(t===void 0)return;let n=t.slice(e.offset).split(/\n(?=#{1,2}\s)/u,1)[0]?.trim();if(n===void 0||n==="")return;let a=n.split(`
`),r=a.shift()?.replace(/^#{1,6}\s*/u,"").trim();if(r===void 0||r==="")return;let s=a.join(" ").replace(/(?:^|\s)[-*]\s+/gu," ").replace(/\s+/gu," ").trim();return{title:r,body:s===""?void 0:s.slice(0,150)}}function Gs(e,o){if(o===void 0)return[];let t=[...o.matchAll(/^##\s+([^\n]+)$/gmu)];return t.flatMap((n,a)=>{let r=n[1]?.trim(),s=n.index;if(r===void 0||s===void 0)return[];let i=/^([A-Z][A-Z0-9-]{3,})(?:\s|$)/u.exec(r)?.[1];if(i===void 0)return[];let g=t[a+1]?.index??o.length,m=o.slice(s+n[0].length,g).replace(/\s+/gu," ").trim();return[{id:i,title:r,body:m===""?void 0:m.slice(0,150),target:{path:e,offset:s,id:i}}]})}var ye=require("react");var qa=4,Ba=1.2,Fs=160,Hs=typeof window>"u"?ye.useEffect:ye.useLayoutEffect;function lt(e,o){return e.map(t=>({...o[t.id]??t.initial,width:t.width,height:t.height}))}function Ua(e,o){if(e==="ArrowLeft")return{x:-o,y:0};if(e==="ArrowRight")return{x:o,y:0};if(e==="ArrowUp")return{x:0,y:-o};if(e==="ArrowDown")return{x:0,y:o}}function ct(e){let o=(0,ye.useRef)(null),[t,n]=(0,ye.useState)({width:0,height:0}),[a,r]=(0,ye.useState)(),[s,i]=(0,ye.useState)(),[g,m]=(0,ye.useState)(!1),c=(0,ye.useRef)(void 0),f=(0,ye.useRef)(void 0),I=(0,ye.useRef)(void 0),w=(0,ye.useRef)(void 0),u=Object.fromEntries(e.nodes.map(N=>[N.id,e.positions[N.id]??N.initial]));s!==void 0&&(u[s.id]=s.point);let b=lt(e.nodes,u),R=e.defaultViewport??((N,j)=>_o(N,j)),C=e.viewport??(t.width>0&&t.height>0?R(b,t,u):it),T=a??C,O=(0,ye.useRef)({viewport:T,committedViewport:C,options:e,size:t});O.current={viewport:T,committedViewport:C,options:e,size:t},Hs(()=>{let N=o.current;if(N===null)return;let j=()=>{n({width:N.clientWidth,height:N.clientHeight})};j();let z=new ResizeObserver(j);return z.observe(N),()=>{z.disconnect()}},[]),(0,ye.useEffect)(()=>{let N=o.current;if(N===null)return;let j=z=>{z.preventDefault();let B=N.getBoundingClientRect(),re=st(O.current.viewport,za(z.deltaY,z.deltaMode),{x:z.clientX-B.left,y:z.clientY-B.top});r(re),clearTimeout(c.current),c.current=setTimeout(()=>{c.current=void 0,O.current.options.onCommit({viewport:re}),r(void 0)},Fs)};return N.addEventListener("wheel",j,{passive:!1}),()=>{N.removeEventListener("wheel",j),clearTimeout(c.current)}},[]);let Q=t.width>0&&t.height>0;(0,ye.useEffect)(()=>{let N=O.current;Q&&N.options.viewport===void 0&&N.options.onCommit({viewport:N.committedViewport})},[Q]),(0,ye.useEffect)(()=>{let N=O.current,j=N.options.selectedId,z=w.current?.width!==N.size.width||w.current.height!==N.size.height;if(!Q||j===I.current&&!z||(I.current=j,w.current=N.size,j===void 0)||j===f.current&&(f.current=void 0,!z))return;let B=N.options.nodes.find(oe=>oe.id===j);if(B===void 0)return;let re={...N.options.positions[j]??B.initial,width:B.width,height:B.height};Bt(N.viewport,re,N.size)||N.options.onCommit({viewport:qt(N.viewport,re,N.size)})},[Q,e.selectedId,t.width,t.height]);let X=N=>{clearTimeout(c.current),c.current=void 0,r(void 0),e.onCommit({viewport:N})},ge=()=>{c.current!==void 0&&(clearTimeout(c.current),c.current=void 0,e.onCommit({viewport:T}),r(void 0))},ee=()=>{X(st(T,Ba,{x:t.width/2,y:t.height/2}))},ve=()=>{X(st(T,1/Ba,{x:t.width/2,y:t.height/2}))},q=()=>{X(_o(b,t))},$=()=>{clearTimeout(c.current),c.current=void 0,r(void 0),e.onCommit({positions:{},viewport:_o(lt(e.nodes,{}),t)})},W=N=>{if(N.target instanceof Element&&N.target.closest("article, button")!==null||N.button!==0&&N.button!==1)return;N.preventDefault(),ge();let j=N.currentTarget;j.setPointerCapture(N.pointerId),j.focus({preventScroll:!0});let z=T,B={x:N.clientX,y:N.clientY},re=!1,oe=z;m(!0);let se=Oe=>{let ae=Oe.clientX-B.x,Ee=Oe.clientY-B.y;!re&&Math.hypot(ae,Ee)<qa||(re=!0,oe={...z,x:z.x+ae,y:z.y+Ee},r(oe))},xe=()=>{j.removeEventListener("pointermove",se),j.removeEventListener("pointerup",xe),j.removeEventListener("pointercancel",xe),m(!1),re?X(oe):(f.current=void 0,e.onCommit({selectedId:null}))};j.addEventListener("pointermove",se),j.addEventListener("pointerup",xe),j.addEventListener("pointercancel",xe)},H=(N,j)=>{if(N.button!==0||N.target instanceof Element&&N.target.closest("button")!==null)return;N.stopPropagation();let z=N.currentTarget;z.setPointerCapture(N.pointerId);let B=u[j]??{x:0,y:0},re={x:N.clientX,y:N.clientY},oe=T.zoom,se=!1,xe=B,Oe=Ee=>{let Ce=Ee.clientX-re.x,we=Ee.clientY-re.y;!se&&Math.hypot(Ce,we)<qa||(se=!0,xe={x:B.x+Ce/oe,y:B.y+we/oe},i({id:j,point:xe}))},ae=()=>{z.removeEventListener("pointermove",Oe),z.removeEventListener("pointerup",ae),z.removeEventListener("pointercancel",ae),i(void 0),se?e.onCommit({positions:{...e.positions,[j]:xe}}):(j!==e.selectedId&&(f.current=j),e.onCommit({selectedId:j}))};z.addEventListener("pointermove",Oe),z.addEventListener("pointerup",ae),z.addEventListener("pointercancel",ae)},Pe=(N,j)=>{if(N.key==="Enter"||e.activateOnSpace===!0&&N.key===" "){N.preventDefault(),e.onActivate(j);return}let z=Ua(N.key,N.shiftKey?40:10);if(z===void 0)return;N.preventDefault(),N.stopPropagation();let B=u[j.id]??j.initial,re={x:B.x+z.x,y:B.y+z.y},oe={...re,width:j.width,height:j.height},se=Q&&!Bt(T,oe,t)?qt(T,oe,t):void 0;se!==void 0&&(clearTimeout(c.current),c.current=void 0,r(void 0)),e.onCommit({positions:{...e.positions,[j.id]:re},viewport:se})},K=N=>{if(N.target!==N.currentTarget)return;let j=Ua(N.key,N.shiftKey?240:60);j!==void 0?(N.preventDefault(),X({...T,x:T.x-j.x,y:T.y-j.y})):N.key==="+"||N.key==="="?(N.preventDefault(),ee()):N.key==="-"||N.key==="_"?(N.preventDefault(),ve()):N.key==="0"?(N.preventDefault(),q()):e.clearSelectionOnEscape===!0&&N.key==="Escape"&&(N.preventDefault(),e.onCommit({selectedId:null}))};return{viewportRef:o,positions:u,viewport:T,panning:g,draggingId:s?.id,zoomIn:ee,zoomOut:ve,fitAll:q,resetLayout:$,startPan:W,startDrag:H,onNodeKeyDown:Pe,onViewportKeyDown:K}}var _=require("react/jsx-runtime");function Ka(e){let o=(0,Qt.useMemo)(()=>Yt(e.production,e.documents),[e.production,e.documents]),t=(0,Qt.useMemo)(()=>Ha(e.production,new Set(o.map(m=>m.id))),[e.production,o]),n=e.versions??[],a=e.selections??{},r=m=>{m.target!==void 0&&e.onNavigate(m.target)},s=ct({nodes:o,positions:e.canvas,viewport:e.viewport,selectedId:e.selectedId,activateOnSpace:!0,defaultViewport:(m,c,f)=>ja(lt(Js(o),f),c),onActivate:r,onCommit:m=>{m.positions!==void 0&&e.onCanvasChange(m.positions),m.viewport!==void 0&&e.onViewportChange(m.viewport),m.selectedId!==void 0&&e.onSelect(m.selectedId??void 0)}}),i=o.find(m=>m.id===e.selectedId),g=20*s.viewport.zoom;return(0,_.jsxs)("section",{className:"oh-story-canvas-shell","aria-label":"\u77ED\u5267\u6545\u4E8B\u4E0E\u955C\u5934\u65E0\u9650\u753B\u5E03",children:[(0,_.jsxs)("div",{className:"oh-story-canvas-toolbar",children:[(0,_.jsx)("div",{className:"oh-story-canvas-help",id:"oh-story-canvas-help",children:"\u62D6\u52A8\u7A7A\u767D\u5904\u5E73\u79FB \xB7 \u6EDA\u8F6E\u7F29\u653E \xB7 \u65B9\u5411\u952E\u79FB\u52A8\u5361\u7247 \xB7 \u53CC\u51FB\u6253\u5F00\u539F\u6587"}),(0,_.jsxs)("div",{className:"oh-story-canvas-controls",children:[(0,_.jsx)("button",{type:"button","aria-label":"\u7F29\u5C0F\u753B\u5E03",onClick:s.zoomOut,children:"\u2212"}),(0,_.jsxs)("span",{"aria-live":"polite",children:[Math.round(s.viewport.zoom*100),"%"]}),(0,_.jsx)("button",{type:"button","aria-label":"\u653E\u5927\u753B\u5E03",onClick:s.zoomIn,children:"\uFF0B"}),(0,_.jsx)("button",{type:"button",onClick:s.fitAll,children:"\u9002\u5E94"}),(0,_.jsx)("button",{type:"button",onClick:s.resetLayout,children:"\u590D\u4F4D"})]})]}),(0,_.jsx)("div",{ref:s.viewportRef,className:"oh-story-canvas-viewport",role:"application","aria-roledescription":"\u65E0\u9650\u753B\u5E03","aria-label":"\u753B\u5E03\u89C6\u91CE","aria-describedby":"oh-story-canvas-help",tabIndex:0,"data-panning":s.panning||void 0,style:{backgroundPosition:`${String(s.viewport.x)}px ${String(s.viewport.y)}px`,backgroundSize:`${String(g)}px ${String(g)}px`},onPointerDown:s.startPan,onKeyDown:s.onViewportKeyDown,children:(0,_.jsxs)("div",{className:"oh-story-canvas",style:{transform:`translate(${String(s.viewport.x)}px, ${String(s.viewport.y)}px) scale(${String(s.viewport.zoom)})`},children:[(0,_.jsx)(Bs,{nodes:o}),(0,_.jsx)("svg",{"aria-hidden":"true",children:t.map(m=>{let c=o.find(O=>O.id===m.from),f=o.find(O=>O.id===m.to),I=c===void 0?void 0:s.positions[c.id],w=f===void 0?void 0:s.positions[f.id];if(I===void 0||w===void 0||c===void 0||f===void 0)return null;let u=I.y+c.height/2,b=w.y+f.height/2,R=I.x+c.width,C=Math.max(60,Math.abs(w.x-R)/2),T=m.to===e.selectedId||m.from===e.selectedId;return(0,_.jsxs)("g",{"data-edge-kind":m.kind,children:[(0,_.jsx)("path",{className:"oh-story-canvas-edge","data-active":T||void 0,d:`M ${String(R)} ${String(u)} C ${String(R+C)} ${String(u)}, ${String(w.x-C)} ${String(b)}, ${String(w.x)} ${String(b)}`}),(0,_.jsx)("text",{className:"oh-story-canvas-edge-label","data-active":T||void 0,x:(R+w.x)/2,y:(u+b)/2-7,children:m.label})]},`${m.kind}:${m.from}:${m.to}`)})}),o.map(m=>(0,_.jsx)(qs,{node:m,point:s.positions[m.id]??m.initial,selected:m.id===e.selectedId,dragging:s.draggingId===m.id,relations:t.filter(c=>c.from===m.id||c.to===m.id).length,versions:n.filter(c=>c.targetId===m.id),job:e.jobs?.findLast(c=>c.targetId===m.id),selections:a,onSelectionsChange:e.onSelectionsChange,onPrepare:e.onPrepare===void 0?void 0:(c,f,I)=>(e.onSelect(c),e.onPrepare?.(c,f,I)),onOpenMedia:e.onOpenMedia,onKeyDown:s.onNodeKeyDown,onPointerDown:s.startDrag,onNavigate:r},m.id))]})}),i!==void 0&&(0,_.jsxs)("div",{className:"oh-story-canvas-context","aria-live":"polite",children:[(0,_.jsxs)("div",{className:"oh-story-canvas-context-copy",children:[(0,_.jsx)("small",{children:"\u5DF2\u9009\u4E2D"}),(0,_.jsx)("strong",{children:i.title})]}),i.target!==void 0&&(0,_.jsx)("button",{type:"button",onClick:()=>{r(i)},children:"\u6253\u5F00\u539F\u6587"}),e.onContinueInChat!==void 0&&(0,_.jsx)("button",{type:"button",onClick:()=>{e.onContinueInChat?.(i.id)},children:"\u5728 Chat \u4E2D\u7EE7\u7EED"})]})]})}function qs(e){let o=He(e.node.id,e.versions,e.selections);return(0,_.jsxs)("article",{className:"oh-story-canvas-node",tabIndex:0,role:"button","aria-label":`${Ya(e.node.kind)} ${e.node.title}\uFF0C${String(e.relations)} \u6761\u5173\u7CFB`,title:`\u6765\u6E90\u6761\u76EE\uFF1A${e.node.id}`,"aria-pressed":e.selected,"data-node-type":e.node.kind,"data-selected":e.selected||void 0,"data-dragging":e.dragging||void 0,style:{left:e.point.x,top:e.point.y,width:e.node.width,height:e.node.height},onKeyDown:t=>{e.onKeyDown(t,e.node)},onPointerDown:t=>{e.onPointerDown(t,e.node.id)},onDoubleClick:()=>{e.onNavigate(e.node)},children:[(0,_.jsxs)("header",{className:"oh-story-canvas-node-head",children:[(0,_.jsxs)("div",{children:[(0,_.jsx)("small",{children:e.node.eyebrow}),(0,_.jsx)("strong",{children:e.node.title})]}),(0,_.jsxs)("span",{children:[e.relations," \u6761\u5173\u7CFB"]})]}),e.node.kind!=="story"&&(0,_.jsx)("div",{className:"oh-story-canvas-node-media",children:o===void 0?(0,_.jsx)("div",{className:"oh-story-canvas-node-placeholder","aria-hidden":"true",children:e.node.kind==="shot"?"\u5F85\u51C6\u5907\u753B\u9762":"\u5F85\u51C6\u5907\u7D20\u6750"}):(0,_.jsx)(Ja,{version:o,interactive:!0})}),(0,_.jsx)("div",{className:"oh-story-canvas-node-copy",children:e.node.description!==void 0&&(0,_.jsx)("p",{children:e.node.description})}),(0,_.jsxs)("div",{className:"oh-story-canvas-node-meta",children:[(0,_.jsx)("span",{children:Us(e.node,o,e.job)}),e.versions.length>0&&(0,_.jsxs)("span",{children:[e.versions.length," \u4E2A\u7248\u672C"]})]}),e.versions.length>1&&(0,_.jsx)("div",{className:"oh-story-canvas-node-versions","aria-label":`${e.node.title} \u6210\u679C\u7248\u672C`,children:e.versions.map((t,n)=>(0,_.jsxs)("button",{type:"button","aria-label":`\u9009\u62E9 ${e.node.title} \u7248\u672C ${String(n+1)}`,"aria-pressed":t.id===o?.id,"data-selected":t.id===o?.id||void 0,onPointerDown:zo,onClick:a=>{a.stopPropagation(),e.onSelectionsChange?.({...e.selections,[e.node.id]:t.id})},children:[(0,_.jsx)(Ja,{version:t}),(0,_.jsxs)("span",{children:["V",String(n+1)]})]},t.id))}),(0,_.jsxs)("footer",{className:"oh-story-canvas-node-actions",children:[e.node.prompt!==void 0&&e.onPrepare!==void 0&&(0,_.jsx)("button",{type:"button",onPointerDown:zo,onClick:t=>{t.stopPropagation(),e.onPrepare?.(e.node.id,"image",e.node.prompt)},children:e.node.kind==="shot"?"\u51C6\u5907\u5173\u952E\u5E27":"\u51C6\u5907\u7D20\u6750"}),e.node.videoPrompt!==void 0&&e.onPrepare!==void 0&&(0,_.jsx)("button",{type:"button",onPointerDown:zo,onClick:t=>{t.stopPropagation(),e.onPrepare?.(e.node.id,"video",e.node.videoPrompt)},children:"\u51C6\u5907\u89C6\u9891"}),o?.path!==void 0&&e.onOpenMedia!==void 0&&(0,_.jsx)("button",{type:"button",onPointerDown:zo,onClick:t=>{t.stopPropagation(),e.onOpenMedia?.(o.path)},children:"\u6253\u5F00\u6587\u4EF6"})]})]})}function Bs({nodes:e}){let o=["story","asset","shot"].flatMap(t=>{let n=e.filter(a=>a.kind===t);return n.length===0?[]:[{kind:t,x:Math.min(...n.map(a=>a.initial.x)),y:Math.min(...n.map(a=>a.initial.y))-34}]});return(0,_.jsx)(_.Fragment,{children:o.map(t=>(0,_.jsx)("div",{className:"oh-story-canvas-group-label","data-group":t.kind,style:{left:t.x,top:t.y},children:Ya(t.kind)},t.kind))})}function Ja({version:e,interactive:o=!1}){return e.kind==="image"?(0,_.jsx)("img",{className:"oh-story-media-preview",src:e.url,alt:e.targetId,loading:"lazy",draggable:!1}):(0,_.jsx)("video",{className:"oh-story-media-preview",src:e.url,controls:o,muted:!o,preload:"metadata",onPointerDown:o?zo:void 0,onClick:o?Ks:void 0})}function Us(e,o,t){if(t!==void 0){if(t.status==="awaiting_confirmation")return"\u7B49\u5F85\u786E\u8BA4";if(t.status==="pending")return"\u7B49\u5F85\u751F\u6210";if(t.status==="running")return"\u6B63\u5728\u751F\u6210";if(t.status==="dispatched_unknown")return"\u6210\u679C\u5F85\u6838\u5BF9";if(t.status==="failed")return"\u751F\u6210\u5931\u8D25\uFF0C\u8BF7\u67E5\u770B\u8BB0\u5F55";if(t.status==="canceled")return"\u5DF2\u505C\u6B62\u751F\u6210"}return o!==void 0?o.kind==="video"?"\u5DF2\u6709\u89C6\u9891":"\u5DF2\u6709\u753B\u9762":e.kind==="story"?"\u6765\u81EA\u5267\u672C":e.kind==="shot"?"\u7B49\u5F85\u753B\u9762":"\u7B49\u5F85\u7D20\u6750"}function Js(e){return[e.find(o=>o.kind==="story"),e.find(o=>o.kind==="asset"),...e.filter(o=>o.kind==="shot").slice(0,1)].filter(o=>o!==void 0)}function Ya(e){return e==="story"?"\u6545\u4E8B":e==="asset"?"\u4EBA\u7269\u4E0E\u573A\u666F":"\u955C\u5934"}function zo(e){e.stopPropagation()}function Ks(e){e.stopPropagation()}var Za="\u53EA\u4F7F\u7528\u5F53\u524D DSH Preset \u53EF\u89C1\u7684\u5DE5\u5177\uFF1B\u6240\u6709\u6587\u4EF6\u3001\u7F51\u7EDC\u3001\u751F\u6210\u548C\u547D\u4EE4\u64CD\u4F5C\u7EE7\u7EED\u9075\u5B88 DSH \u6743\u9650\u4E0E\u5BA1\u6279\u3002",Qa="\u53C2\u8003\u8F93\u5165\u4EE5\u6765\u6E90\u6761\u76EE\u81EA\u5DF1\u7684\u58F0\u660E\u4E3A\u51C6\uFF08IMG-* \u7684\u300C\u53C2\u8003\u300D\uFF0CSHOT-*\uFF0FMOTION-* \u7684\u300C\u8F93\u5165\u53C2\u8003\u56FE\u300D\uFF0C\u4EE5\u53CA MOTION-* \u72EC\u7ACB\u7684\u300C\u53C2\u8003\u97F3\u9891\u300D\uFF09\uFF1Areference_bindings \u5FC5\u987B\u4E0E\u8BE5\u6761\u76EE\u9010\u69FD\u4E00\u81F4\uFF0C\u5DE5\u4F5C\u53F0\u5217\u51FA\u7684\u8865\u5145\u53C2\u8003\u53EA\u4F5C\u6838\u5BF9\uFF0C\u6761\u76EE\u91CC\u6CA1\u6709\u58F0\u660E\u7684\u4E0D\u8981\u76F4\u63A5\u52A0\u8FDB job\uFF0C\u786E\u9700\u4F7F\u7528\u65F6\u5148\u8BF7\u62E5\u6709\u8BE5\u6761\u76EE\u7684\u9636\u6BB5\u4FEE\u8BA2\u6587\u6863\u3002\u8D77\u59CB\u5E27\u4E0E\u7ED3\u675F\u5E27\u7684\u89D2\u8272\u53EA\u53D6\u81EA\u6765\u6E90\u6761\u76EE\u81EA\u5DF1\u300C\u8F93\u5165\u53C2\u8003\u56FE\u300D\u5404\u69FD\u4F4D\u8BB0\u5F55\u7684\u7528\u9014\uFF08\u8D77\u59CB\u5E27\uFF0F\u7ED3\u675F\u5E27\uFF09\uFF1ASHOT-* \u770B\u300A\u5206\u955C.md\u300B\uFF0CMOTION-* \u770B\u300A\u89C6\u9891\u63D0\u793A\u8BCD.md\u300B\uFF1B\u518D\u7531\u76EE\u6807\u6A21\u578B\u65B9\u8A00\u7FFB\u6210 adapter \u7684 role\uFF0C\u4E0D\u6309\u6587\u4EF6\u540D\u6216\u5DE5\u4F5C\u53F0\u6E05\u5355\u63A8\u65AD\u3002\u76EE\u6807\u65B9\u8A00\u7528 first_frame\uFF0Flast_frame \u4F4D\u7F6E\u627F\u63A5\u8FD9\u7EC4\u8F93\u5165\u65F6\uFF0C\u7ED3\u675F\u5E27\u53EA\u8FDB last_frame\uFF0C\u7EDD\u4E0D\u964D\u7EA7\u6210\u666E\u901A\u53C2\u8003\u56FE\uFF1B\u65B9\u8A00\u8981\u6C42\u6574\u7EC4\u8D70\u591A\u69FD\u53C2\u8003\u65F6\uFF08\u5982 MiniMax H3 \u7684 full-reference\uFF1A\u9996\u5C3E\u5E27\u8F93\u5165\u4E0E\u53C2\u8003\u8F93\u5165\u4E92\u65A5\uFF0C\u8D77\u59CB\u5E27\u3001\u7ED3\u675F\u5E27\u90FD\u968F\u6574\u7EC4\u4EE5 reference_image \u9001\u5165\uFF09\uFF0C\u6309\u65B9\u8A00\u7FFB\u8BD1\uFF0C\u5E76\u5728\u9884\u89C8\u91CC\u5199\u660E\u7ED3\u675F\u5E27\u5C06\u4F5C\u4E3A\u53C2\u8003\u56FE\u9001\u5165\uFF0C\u6216\u5148\u8BF7\u5206\u955C owner \u53D6\u820D\u3002MOTION-* \u7684\u300C\u53C2\u8003\u97F3\u9891\u300D\u4E0D\u6DF7\u5165\u300C\u8F93\u5165\u53C2\u8003\u56FE\u300D\uFF1A\u5B83\u6392\u5728\u56FE\u7247 binding \u4E4B\u540E\uFF0Crole \u56FA\u5B9A\u4E3A reference_audio\uFF0Ccharacter \u9010\u5B57\u7167\u6284\u8BE5\u884C\u300C\u89D2\u8272\u300D\uFF0C\u97F3\u9891\u987A\u5E8F\u4ECD\u72EC\u7ACB\u4ECE 1 \u7F16\u53F7\uFF1B\u5185\u7F6E seedance \u4E0E minimax-h3 \u5728\u6240\u9009\u6A21\u578B\u652F\u6301\u65F6\u9ED8\u8BA4\u627F\u63A5 reference_audio\uFF0C\u81EA\u5B9A\u4E49\u5916\u90E8 adapter profile \u672A\u663E\u5F0F\u58F0\u660E\u652F\u6301 reference_audio \u65F6\u5FC5\u987B\u5728\u63D0\u4EA4\u524D\u5931\u8D25\uFF0C\u4E0D\u80FD\u76F4\u63A5\u4E22\u5F03\u6216\u628A\u97F3\u9891\u5F53\u56FE\u7247\u3002",Ys="\u5206\u955C.md \u7684 SHOT-* \u53EA\u4EA7\u51FA\u8D77\u59CB\u5E27\uFF1B\u8981\u4EA7\u51FA\u7ED3\u675F\u5E27\uFF0C\u5148\u7531\u56FE\u7247\u63D0\u793A\u8BCD\u9636\u6BB5\u5EFA\u7ACB\u72EC\u7ACB\u7684 IMG-* \u6761\u76EE\u518D\u6295\u4EA7\u3002";function Xa(e){return e==="image"?`${Qa}${Ys}`:Qa}function er(e,o,t){let n=t.length===0?"\u65E0":t.map(a=>`${a.targetId}: ${a.path??a.url}`).join(`
`);return`/short-drama-produce

\u8BF7\u4E3A\u300C${Me(e,o.targetId)}\u300D\u51C6\u5907\u4E00\u4EFD${o.kind==="image"?"\u753B\u9762":"\u89C6\u9891"}\u751F\u6210\u9884\u89C8\uFF0C\u5148\u8BA9\u6211\u6838\u5BF9\u5185\u5BB9\u548C\u6210\u672C\uFF0C\u518D\u51B3\u5B9A\u662F\u5426\u5F00\u59CB\u751F\u6210\u3002

\u53EA\u51C6\u5907\u5F53\u524D\u5355\u9879\u751F\u4EA7\u4EFB\u52A1\uFF0C\u4E0D\u8FD0\u884C Provider\u3002
- \u4EFB\u52A1 ID\uFF1A${o.id}
- \u4EFB\u52A1\u7C7B\u578B\uFF1A${o.kind==="image"?"\u56FE\u7247/\u5173\u952E\u5E27":"\u955C\u5934\u89C6\u9891"}
- \u5EFA\u8BAE adapter \u5951\u7EA6\uFF1A${o.kind==="image"?"gpt-image-2":"seedance"}\uFF08\u5B9E\u9645\u914D\u7F6E\u4E0E\u6A21\u578B\u4EE5\u5F53\u524D DSH \u8FD0\u884C\u73AF\u5883\u4E3A\u51C6\uFF09
- \u6295\u4EA7\u5BF9\u8C61\uFF1A${o.targetId}
- \u521B\u4F5C\u6587\u6863\u76EE\u5F55\uFF1A${e.episodeDirectory}
- \u5DE5\u4F5C\u53F0\u5217\u51FA\u7684\u8865\u5145\u53C2\u8003\uFF08\u4E0D\u662F\u751F\u4EA7\u8F93\u5165\u5FEB\u7167\uFF09\uFF1A
${n}
- \u8F93\u51FA\u76EE\u5F55\uFF1A${e.episodeDirectory}/\u5236\u4F5C\u6210\u679C/${o.targetId}
- \u8F93\u51FA\u6587\u4EF6\u540D\u5FC5\u987B\u540C\u65F6\u5305\u542B\u6295\u4EA7\u5BF9\u8C61 ID \u4E0E\u4EFB\u52A1 ID ${o.id}\uFF0C\u4EE5\u4FBF DSH \u5DE5\u4F5C\u53F0\u5173\u8054\u7248\u672C\u3002

\u5F85\u9884\u68C0\u63D0\u793A\u8BCD\uFF1A
${o.prompt}

${Xa(o.kind)}

\u6309 short-drama-produce \u7684\u786C\u95F8\u95E8\u5EFA\u7ACB\u4E34\u65F6 job \u5E76\u6267\u884C prepare\uFF0C\u5728 Chat \u4E2D\u5B8C\u6574\u5C55\u793A adapter\u3001\u6A21\u578B/profile\u3001\u6570\u91CF\u3001\u53C2\u6570\u3001references\u3001outputs \u4E0E overwrite\u3002\u6B64\u6309\u94AE\u53EA\u8868\u8FBE\u201C\u51C6\u5907\u9884\u89C8\u201D\uFF0C\u4E0D\u6784\u6210\u770B\u5230\u9884\u89C8\u540E\u7684\u751F\u4EA7\u786E\u8BA4\uFF1B\u4E0D\u5F97 confirm \u6216 run\u3002\u7528\u6237\u5728\u540E\u7EED\u6D88\u606F\u660E\u786E\u786E\u8BA4\u8FD9\u4EFD\u9884\u89C8\u540E\uFF0C\u624D\u53EF\u8C03\u7528 oh_story_production track_job \u767B\u8BB0\u540C\u4E00\u4E2A\u4EFB\u52A1 ID\uFF0C\u5E76\u8FD0\u884C Provider\u3002${Za}`}function or(e,o,t){return`/short-drama-produce

\u8BF7\u4E3A\u8FD9 ${String(t.length)} \u4E2A\u955C\u5934\u51C6\u5907\u4E00\u4EFD${o.kind==="image"?"\u5173\u952E\u5E27":"\u89C6\u9891"}\u751F\u6210\u9884\u89C8\uFF0C\u5148\u8BA9\u6211\u6838\u5BF9\u5185\u5BB9\u548C\u6210\u672C\uFF0C\u518D\u51B3\u5B9A\u662F\u5426\u5F00\u59CB\u751F\u6210\u3002

\u53EA\u51C6\u5907\u5F53\u524D\u6279\u91CF\u751F\u4EA7\u4EFB\u52A1\uFF0C\u4E0D\u8FD0\u884C Provider\u3002
- \u6279\u6B21\u4EFB\u52A1 ID\uFF1A${o.id}
- \u4EFB\u52A1\u7C7B\u578B\uFF1A${o.kind==="image"?"\u6279\u91CF\u5173\u952E\u5E27":"\u6279\u91CF\u955C\u5934\u89C6\u9891"}
- \u5EFA\u8BAE adapter \u5951\u7EA6\uFF1A${o.kind==="image"?"gpt-image-2":"seedance"}\uFF08\u5B9E\u9645\u914D\u7F6E\u4E0E\u6A21\u578B\u4EE5\u5F53\u524D DSH \u8FD0\u884C\u73AF\u5883\u4E3A\u51C6\uFF09
- \u521B\u4F5C\u6587\u6863\u76EE\u5F55\uFF1A${e.episodeDirectory}
- \u8F93\u51FA\u6839\u76EE\u5F55\uFF1A${e.episodeDirectory}/\u5236\u4F5C\u6210\u679C
- \u6BCF\u4E2A\u8F93\u51FA\u6587\u4EF6\u540D\u5FC5\u987B\u5305\u542B\u5BF9\u5E94\u955C\u5934 ID \u4E0E\u6279\u6B21\u4EFB\u52A1 ID ${o.id}\u3002

${t.map(n=>`## ${n.id}
${n.prompt}`).join(`

`)}

${Xa(o.kind)}

\u628A\u6570\u91CF\u3001\u9010\u9879\u8F93\u51FA\u548C\u6210\u672C\u8FB9\u754C\u5B8C\u6574\u5C55\u793A\u7ED9\u521B\u4F5C\u8005\u3002\u6B64\u6309\u94AE\u53EA\u8868\u8FBE\u201C\u51C6\u5907\u9884\u89C8\u201D\uFF0C\u4E0D\u6784\u6210\u770B\u5230\u9884\u89C8\u540E\u7684\u751F\u4EA7\u786E\u8BA4\uFF1B\u4E0D\u5F97 confirm \u6216 run\u3002\u7528\u6237\u5728\u540E\u7EED\u6D88\u606F\u660E\u786E\u786E\u8BA4\u8FD9\u4EFD\u9884\u89C8\u540E\uFF0C\u624D\u53EF\u8C03\u7528 oh_story_production track_job \u767B\u8BB0\u540C\u4E00\u4E2A\u6279\u6B21\u4EFB\u52A1 ID\uFF0C\u5E76\u8FD0\u884C Provider\u3002${Za}`}function tr(e,o,t){return`/short-drama-edit

\u6267\u884C\u521B\u4F5C\u8005\u5DF2\u660E\u786E\u786E\u8BA4\u7684\u6210\u7247\u88C5\u914D\u4EFB\u52A1\u3002
- \u4EFB\u52A1 ID\uFF1A${o.id}
- \u5267\u96C6\uFF1A${e.episodeDirectory}
- \u521B\u4F5C\u8005\u5728\u6210\u7247\u89C6\u56FE\u6392\u5B9A\u7684\u955C\u5E8F\u4E0E\u5B9E\u9645\u6765\u6E90\uFF08\u81EA\u52A8\u6A21\u5F0F\u5DF2\u6309\u89C6\u9891\u4F18\u5148\u89E3\u6790\uFF1B\u663E\u5F0F\u9009\u6E90\u4F18\u5148\u4E8E\u81EA\u52A8\u7ED3\u679C\uFF09\uFF0C\u4E0D\u5F97\u81EA\u884C\u6362\u5E8F\u6216\u66FF\u6362\uFF1A
${t.map((n,a)=>`${String(a+1)}. ${n.shotId} \u2192 ${n.sourceId} \xB7 ${n.kind==="video"?"\u89C6\u9891":"\u9759\u5E27"} \xB7 ${n.path}${n.kind==="image"?` \xB7 \u5206\u955C\u65F6\u957F ${n.durationSeconds===void 0?"\u672A\u586B\u5199":`${String(n.durationSeconds)} \u79D2`}`:""}`).join(`
`)}
- \u526A\u8F91\u5355\uFF1A${e.episodeDirectory}/\u526A\u8F91\u5355.md
- \u8F93\u51FA\uFF1A${e.episodeDirectory}/\u5236\u4F5C\u6210\u679C/\u6210\u7247/

\u5148\u5199\u526A\u8F91\u5355\u518D\u6E32\u67D3\u3002\u9010\u6BB5\u770B\u5B8C\u7D20\u6750\u540E\u5199\u4E0B\u771F\u5B9E\u7684\u5165\u51FA\u70B9\u3001\u53D6\u820D\u7406\u7531\u3001\u58F0\u97F3\u5904\u7406\u4E0E\u5B57\u5E55\uFF0C\u4E0D\u8981\u6309\u955C\u5E8F\u51ED\u7A7A\u586B\u65F6\u95F4\uFF1B\u5B57\u5E55\u9010\u5B57\u53D6\u81EA\u5267\u672C.md\u3002\u4E0A\u9762\u6807\u4E3A\u89C6\u9891\u7684\u6765\u6E90\u4F7F\u7528\u5BF9\u5E94 MOTION-*\uFF08\u82E5\u5C5E\u4E8E\u89C6\u9891\u63D0\u793A\u8BCD\u91CC\u7684\u591A\u955C\u7EC4\u5219\u7528\u5BF9\u5E94 GROUP-*\uFF09\uFF0C\u6807\u4E3A\u9759\u5E27\u7684\u6765\u6E90\u9010\u5B57\u4F7F\u7528\u7ED9\u51FA\u7684 SHOT-* \u6216 IMG-*\uFF1B\u9759\u5E27\u4EE5\u5217\u51FA\u7684\u5206\u955C\u65F6\u957F\u4E3A\u8D77\u70B9\uFF0C\u4F46\u82E5\u5DF2\u6709\u914D\u97F3\uFF0C\u987B\u5148\u91CF\u51FA\u771F\u5B9E\u6709\u58F0\u533A\u95F4\u5E76\u636E\u6B64\u6392\u65F6\u957F\uFF0C\u4E0D\u80FD\u622A\u65AD\u53F0\u8BCD\u3002\u526A\u8F91\u5355\u8BB0\u5F55\u7D20\u6750\u53D6\u820D\u3001\u5165\u51FA\u70B9\u3001\u540E\u671F\u5904\u7406\u4E0E\u4EA4\u4ED8\u89C4\u683C\uFF0C\u4E0D\u6539\u5199\u5267\u672C\u3001\u5206\u955C\u6216\u89C6\u9891\u63D0\u793A\u8BCD\u7684\u8BED\u4E49\uFF1B\u4E0D\u8981\u9000\u56DE\u53BB\u751F\u6210\u65B0\u7D20\u6750\u3002

\u6309\u5F53\u524D\u5236\u4F5C\u5F62\u6001\u4E3A\u6BCF\u4E00\u955C\u4EA4\u4EE3\u4E0B\u843D\uFF1A\u89C6\u9891\u6BB5\u6765\u6E90\u5199 MOTION-* \u6216 GROUP-*\uFF1B\u9759\u5E27\u6BB5\u6765\u6E90\u5199\u5206\u955C\u91CC\u7684 SHOT-* \u6216\u56FE\u7247\u63D0\u793A\u8BCD\u91CC\u7684 IMG-*\uFF0C\u4E0D\u5F97\u56E0\u4E3A\u7701\u94B1\u3001\u5931\u8D25\u6216\u6392\u961F\u81EA\u884C\u628A\u89C6\u9891\u6539\u6210\u9759\u5E27\u3002\u5168\u96C6\u4EA4\u4ED8\uFF08\u672A\u52A0 --partial\uFF09\u65F6\uFF0C\u5B58\u5728 SHOT-* \u9759\u5E27\u5219\u5206\u955C\u91CC\u7684\u6BCF\u955C\u5FC5\u987B\u5165\u7247\u6216\u5217\u5165\u300C\u672A\u91C7\u7528\u955C\u5934\u300D\uFF0C\u5B58\u5728\u89C6\u9891\u6BB5\u5219\u89C6\u9891\u63D0\u793A\u8BCD\u91CC\u7684\u6BCF\u4E2A MOTION-*\uFF0FGROUP-* \u4E5F\u5FC5\u987B\u5165\u7247\u6216\u8BF4\u660E\u672A\u91C7\u7528\u3002\u89C6\u9891\u4E0E\u9759\u5E27\u6DF7\u526A\u65F6\uFF0C\u540C\u4E00\u955C\u7528\u4E86 SHOT-* \u53EF\u540C\u65F6\u8986\u76D6\u5BF9\u5E94 MOTION-*\uFF0C\u7528\u4E86 MOTION-*\uFF0FGROUP-* \u53EF\u540C\u65F6\u8986\u76D6\u5BF9\u5E94 SHOT-*\u3002\u672A\u91C7\u7528\u9879\u5199\u8FDB\u526A\u8F91\u5355\u5F00\u5934\uFF08\u4EA4\u4ED8\u89C4\u683C\u6240\u5728\u5904\u3001\u7B2C\u4E00\u4E2A\u300C## CUT-\u300D\u4E4B\u524D\uFF09\u7684\u4E00\u884C\uFF1A\u300C- \u672A\u91C7\u7528\u955C\u5934\uFF1AMOTION-\u2026\uFF08\u7406\u7531\uFF1A\u6587\u4EF6\u7F3A\u5931\u2014\u2014\u2026\uFF09\uFF1BGROUP-\u2026\uFF08\u7406\u7531\uFF1A\u53D9\u4E8B\u53D6\u820D\u2014\u2014\u2026\uFF09\uFF1BSHOT-\u2026\uFF08\u7406\u7531\uFF1A\u8D28\u91CF\u4E0D\u53EF\u7528\u2014\u2014\u2026\uFF09\u300D\u3002\u591A\u9879\u7528\u5168\u89D2\u300C\uFF1B\u300D\u8FDE\u63A5\uFF0C\u7406\u7531\u4E0D\u80FD\u4E3A\u7A7A\u3001\u81EA\u8EAB\u4E0D\u542B\u300C\uFF1B\u300D\uFF0C\u5E76\u5199\u660E\u5C5E\u4E8E\u6587\u4EF6\u7F3A\u5931\u3001\u8D28\u91CF\u4E0D\u53EF\u7528\u8FD8\u662F\u53D9\u4E8B\u53D6\u820D\uFF1B\u6F0F\u6389\u4EFB\u4F55\u4E00\u4E2A\uFF0Ccheck \u90FD\u4F1A\u963B\u65AD\u3002\u9700\u8981\u9AD8\u6F6E\u91CD\u653E\u6216\u95EA\u56DE\u590D\u7528\u540C\u6E90\u91CD\u53E0\u533A\u95F4\u65F6\uFF0C\u5728\u8BE5 CUT \u5199\u660E\u300C- \u91CD\u653E\uFF1A<\u53D9\u4E8B\u7406\u7531>\u300D\u3002

\u526A\u8F91\u5355\u843D\u76D8\u540E\u4F9D\u6B21\u8FD0\u884C edit_tool.py \u7684 check \u4E0E render\uFF0Ccheck \u62A5\u51FA\u7684\u95EE\u9898\u5148\u6539\u6587\u6863\u518D\u91CD\u8DD1\u3002\u540C\u5BBD\u9AD8\u6BD4\u4F46\u5206\u8FA8\u7387\u6216\u5E27\u7387\u4E0D\u540C\u7684\u89C6\u9891\u7D20\u6750\u7531 check \u63D0\u9192\u3001render \u81EA\u52A8\u7F29\u653E\u5E76\u8F6C\u6362\u5E27\u7387\u81F3\u4EA4\u4ED8\u89C4\u683C\uFF1B\u9759\u5E27\u5219\u6309\u4EA4\u4ED8\u89C4\u683C\u7B49\u6BD4\u94FA\u6EE1\u3001\u5C45\u4E2D\u88C1\u5207\u5E76\u6309\u8FD0\u955C\u51FA\u753B\uFF0C\u56E0\u6B64\u53EA\u8981\u6709\u9759\u5E27\u5C31\u5FC5\u987B\u586B\u5199\u300C\u753B\u5E45\u4E0E\u5E27\u7387\u300D\u3002\u89C6\u9891\u88AB check \u62A5\u51FA\u5BBD\u9AD8\u6BD4\u660E\u663E\u4E0D\u4E00\u81F4\uFF08\u5982\u6A2A\u5C4F\u6DF7\u5165\u7AD6\u5C4F\uFF09\u65F6\uFF0C\u5728\u5F53\u524D DSH \u6267\u884C\u73AF\u5883\u91CC\u7ECF\u5BA1\u6279\u7528 ffmpeg \u6309\u4EA4\u4ED8\u89C4\u683C\u7EDF\u4E00\u753B\u5E45\u3001\u4FDD\u7559\u6784\u56FE\uFF0C\u65B0\u6587\u4EF6\u5199\u5230 ${e.episodeDirectory}/\u5236\u4F5C\u6210\u679C/\u6210\u7247/\u89C4\u683C\u7EDF\u4E00/\u2014\u2014\u8FD9\u662F\u526A\u8F91\u9636\u6BB5\u81EA\u5DF1\u7684\u4E2D\u95F4\u6587\u4EF6\uFF0C\u4E0D\u653E\u5728\u751F\u4EA7\u9636\u6BB5\u7684\u539F\u7D20\u6750\u65C1\u8FB9\u3001\u4E0D\u8986\u76D6\u5DF2\u751F\u4EA7\u7684\u7D20\u6750\uFF0C\u6587\u4EF6\u540D\u4E5F\u4E0D\u6CBF\u7528\u539F\u6587\u4EF6\u91CC\u7684\u4EFB\u52A1 ID\uFF08\u53EF\u76F4\u63A5\u7528 MOTION \u6216 GROUP ID\uFF09\uFF1B\u5728\u8BE5 CUT \u4E0B\u8BB0\u5F55\u88C1\u5207\u6216\u7559\u8FB9\uFF08\u4E0D\u8981\u5199\u8FDB\u300C\u753B\u9762\u300D\u884C\uFF0C\u5B83\u53EA\u8BA4\u4EAE\u5EA6\u3001\u9971\u548C\u3001\u8272\u6E29\u6216\u300C\u65E0\u300D\u300C\u4E0D\u6821\u300D\uFF09\uFF0C\u628A\u300C\u6765\u6E90\u300D\u6539\u6307\u65B0\u6587\u4EF6\uFF0C\u5165\u51FA\u70B9\u968F\u8F6C\u6362\u53D8\u5316\u65F6\u540C\u6B65\u4FEE\u6539\uFF0C\u518D\u91CD\u8DD1 check\u3002\u9759\u5E27\u6765\u6E90\u5165\u70B9\u5199 0.00\u3001\u51FA\u70B9\u7B49\u4E8E\u65F6\u957F\uFF08\u786C\u4E0B\u9650\u4E3A 2 \u5E27\u5373 24fps \u4E0B 0.08 \u79D2\uFF0C\u77ED\u4E8E 0.50 \u79D2\u4F1A\u5217\u5165\u63D0\u9192\uFF09\uFF1B\u9700\u8981\u8FD0\u52A8\u65F6\u53EA\u7528\u526A\u8F91\u5355\u652F\u6301\u7684\u56FA\u5B9A\u3001\u63A8\u8FD1\u3001\u62C9\u8FDC\u6216\u5E73\u79FB\u5199\u6CD5\u3002

\u9ED8\u8BA4\u7684\u786C\u5B57\u5E55\u8DEF\u7EBF\u9700\u8981\u5E26 libass \u7684 ffmpeg\uFF0C\u7F3A libass \u65F6\u5982\u5B9E\u62A5\u51FA\uFF0C\u4E0D\u8981\u6084\u6084\u53BB\u6389\u5B57\u5E55\u3002Remotion \u5728\u9879\u76EE\u5916\u7684 ~/.cache/short-drama-edit/remotion \u91CC\u88C5 Node \u4F9D\u8D56\u3001\u9010\u5E27\u8FC7\u65E0\u5934\u6D4F\u89C8\u5668\uFF1A\u53EF\u9009\u7684 Remotion \u5B57\u5E55\u8DEF\u7EBF\u8981\u5B83\uFF0C\u526A\u8F91\u5355\u91CC\u53EA\u8981\u6709\u300C\u753B\u9762\u6587\u5B57\u300D\u884C\u4E5F\u5FC5\u987B\u8981\u5B83\uFF1B\u53EA\u6709\u521B\u4F5C\u8005\u660E\u786E\u540C\u610F\u8FD9\u6B21\u5B89\u88C5\uFF08\u5728\u8BE5\u76EE\u5F55 npm install\uFF0C0.8 \u4E4B\u524D\u88C5\u8FC7\u7684\u8981\u91CD\u88C5\u4E00\u6B21\uFF09\u65F6\u624D\u8D70\uFF0C\u672A\u540C\u610F\u5C31\u4E0D\u5199\u300C\u753B\u9762\u6587\u5B57\u300D\u884C\uFF0C\u5E76\u544A\u8BC9\u521B\u4F5C\u8005\u753B\u9762\u91CC\u7559\u7ED9\u9762\u677F\u7684\u7A7A\u767D\u4F1A\u4FDD\u6301\u7A7A\u767D\u3002\u526A\u8F91\u5355\u7684\u300C\u58F0\u97F3\u300D\u884C\u53EA\u662F\u8BB0\u5F55\uFF0Crender \u4E0D\u6267\u884C\u5B83\uFF1Arender \u5207\u6BB5\u3001\u7F29\u653E\u8F6C\u6362\u540C\u6BD4\u4F8B\u89C6\u9891\u3001\u9759\u5E27\u51FA\u753B\u4E0E\u8FD0\u955C\u3001\u540C\u573A\u666F\u81EA\u52A8\u63A5\u955C\uFF08CUT \u5199\u4E86\u300C\u753B\u9762\u300D\u6821\u6B63\u5C31\u66FF\u4EE3\u5B83\uFF0C\u300C\u753B\u9762\uFF1A\u4E0D\u6821\u300D\u8DF3\u8FC7\u5B83\uFF0C\u4EA4\u4ED8\u89C4\u683C\u5199\u300C\u63A5\u955C\u5339\u914D\uFF1A\u65E0\u300D\u6574\u96C6\u5173\u95ED\uFF09\u3001\u786C\u62FC\u63A5\u3001\u6DF7\u5165\u300C\u97F3\u6548\u300D\u300C\u914D\u97F3\u300D\u300C\u73AF\u5883\u58F0\u300D\u884C\u3001\u70E7\u5B57\u5E55\u4E0E\u753B\u9762\u6587\u5B57\u3001\u53EF\u9009\u9897\u7C92\u3001\u7EDF\u4E00\u54CD\u5EA6\u3002\u914D\u97F3\u53EF\u7528\u8D1F\u8D77\u70B9\u505A J-cut\uFF0C\u4E5F\u53EF\u8DE8\u5207\u70B9\u505A L-cut\uFF1B\u5B57\u5E55\u540C\u6837\u53EF\u8DE8\u5207\u70B9\uFF0C\u6309\u6574\u6761\u7247\u6838\u5BF9\u4E0D\u91CD\u53E0\u4E14\u4E0D\u8D8A\u8FC7\u7ED3\u5C3E\u3002\u300C\u97F3\u6548\u300D\u300C\u914D\u97F3\u300D\u300C\u73AF\u5883\u58F0\u300D\u4E4B\u5916\u7684\u6DF7\u97F3\u3001\u4EA4\u53C9\u6DE1\u5165\u3001\u914D\u4E50\u3001\u8F6C\u573A\u6216\u683C\u5F0F\u8F6C\u6362\u90FD\u662F\u53E6\u4E00\u6B65\u7ECF\u5BA1\u6279\u7684\u5916\u90E8 ffmpeg \u5904\u7406\uFF0C\u5148\u5199\u5230\u4E34\u65F6\u6587\u4EF6\uFF1B\u8FD9\u4E00\u6B65\u6700\u540E\u8981\u50CF render \u4E00\u6837\u6309\u526A\u8F91\u5355\u7684\u300C\u4EA4\u4ED8\u54CD\u5EA6\u300D\u5BF9\u6574\u7247\u505A\u4E24\u904D loudnorm\uFF08I=\u4EA4\u4ED8\u54CD\u5EA6\u3001TP=\u771F\u5CF0\u503C\u4E0A\u9650\uFF08\u9ED8\u8BA4 -1.5\uFF09\u3001LRA=11\uFF0C\u7B2C\u4E8C\u904D\u4EE3\u5165\u7B2C\u4E00\u904D\u7684\u5B9E\u6D4B\u503C\u5E76\u7528 linear=true\uFF09\uFF0C\u97F3\u9891\u7F16\u7801\u4E3A AAC 192k\u300148 kHz\uFF0C\u7136\u540E\u624D\u66FF\u6362 ${e.episodeDirectory}/\u5236\u4F5C\u6210\u679C/\u6210\u7247/\u6210\u7247.mp4\uFF0C\u5E76\u628A\u547D\u4EE4\u8BB0\u8FDB\u526A\u8F91\u5355\uFF1B\u91CD\u65B0 render \u4F1A\u8986\u76D6\u6210\u7247\uFF0C\u8FD9\u4E9B\u6B65\u9AA4\u8981\u91CD\u505A\u3002\u6700\u540E\u5BF9\u4EA4\u4ED8\u7684\u8FD9\u4EFD\u6210\u7247.mp4 \u8FD0\u884C edit_tool.py verify \u5E76\u62A5\u544A\u5B9E\u6D4B\u6570\u5B57\uFF0C\u300C\u672A\u6D4B\u300D\u9879\u7167\u5B9E\u5199\u672A\u6D4B\u3002

ffmpeg \u4E0E ffprobe \u901A\u8FC7\u5F53\u524D DSH \u6267\u884C\u73AF\u5883\u8C03\u7528\uFF0C\u4E0D\u53EF\u7528\u65F6\u5982\u5B9E\u62A5\u51FA\u6765\uFF0C\u4E0D\u8981\u628A\u300C\u6CA1\u6D4B\u300D\u5199\u6210\u300C\u901A\u8FC7\u300D\u3002\u6240\u6709\u547D\u4EE4\u548C\u5199\u5165\u7EE7\u7EED\u9075\u5B88 DSH \u6743\u9650\u4E0E\u5BA1\u6279\uFF0C\u4E0D\u5F97\u4F2A\u9020\u6210\u529F\u3002`}var h=require("react/jsx-runtime");var Qs={shots:"\u955C\u5934\u6E05\u5355",assets:"\u7D20\u6750",tasks:"\u751F\u6210\u8BB0\u5F55",sequence:"\u6210\u7247",canvas:"\u753B\u5E03"},nr=["canvas","assets","tasks","sequence"],Zs={awaiting_confirmation:"\u7B49\u5F85\u786E\u8BA4",pending:"\u6392\u961F\u4E2D",running:"\u751F\u6210\u4E2D",dispatched_unknown:"\u72B6\u6001\u5F85\u786E\u8BA4",succeeded:"\u5DF2\u5B8C\u6210",failed:"\u5931\u8D25",canceled:"\u5DF2\u53D6\u6D88"},ar={character:"\u4EBA\u7269",scene:"\u573A\u666F",prop:"\u9053\u5177",state:"\u72B6\u6001",unknown:"\u8BBE\u5B9A"},Xs={image:"\u56FE\u7247",video:"\u89C6\u9891",composition:"\u6210\u7247"},ed="\u5236\u4F5C\u6210\u679C/\u6210\u7247/\u6210\u7247.mp4";function od(e,o,t){let n=new Map(t.map(r=>[r.id,r])),a=new Map(e.shots.map(r=>[r.id,r]));return o.flatMap(r=>{let s=r.versionId===void 0?void 0:n.get(r.versionId),i=s?.path;if(s===void 0||i===void 0)return[];let g=a.get(r.shotId),m=s.kind==="video"?g?.motion?.id??r.shotId:s.targetId.startsWith("IMG-")?s.targetId:r.shotId;return[{shotId:r.shotId,sourceId:m,kind:s.kind,path:i,durationSeconds:g?.durationSeconds}]})}function td(e,o){let t=o?.[`${e.episodeDirectory}/\u5267\u672C.md`]?.trim();return e.shots.length+e.assets.length+e.visualAssets.length>0||t!==void 0&&t!==""}var nd={image:"\u56FE\u7247",video:"\u89C6\u9891",tts:"\u8BED\u97F3",music:"\u97F3\u4E50"};function ad({sessionId:e,diagnostics:o,onNavigate:t}){let[n,a]=(0,be.useState)(),[r,s]=(0,be.useState)(0),[i,g]=(0,be.useState)(!1),[m,c]=(0,be.useState)(!1);(0,be.useEffect)(()=>{let T=new AbortController;return fetch(he("drama-preflight",e),{signal:T.signal}).then(async O=>{if(!O.ok)throw new Error(`HTTP ${String(O.status)}`);let Q=await O.json();T.signal.aborted||a(Q)}).catch(()=>{T.signal.aborted||a("failed")}),()=>{T.abort()}},[r,e]);let f=typeof n=="object"?n.adapters.filter(T=>T.configured).length:0,I=typeof n=="object"?n.adapters.length:0,w=typeof n!="object"?"neutral":!n.python.ok||!n.adapterConfig.ok?"error":f===I?"ready":f>0?"partial":"idle",u=o.filter(T=>T.severity==="error").length,b=typeof n=="object"?n.adapterConfig.path.split(/[\\/]/u).at(-1):void 0,R=u>0?"error":o.length>0?"warning":w,C=n==="failed"?"\u68C0\u67E5\u5931\u8D25":u>0?`${String(u)} \u9879\u9700\u8981\u5904\u7406`:o.length>0?`${String(o.length)} \u9879\u63D0\u9192`:typeof n!="object"?"\u68C0\u67E5\u4E2D\u2026":!n.python.ok||!n.adapterConfig.ok?"\u9700\u8981\u914D\u7F6E":f===I?"\u5236\u4F5C\u5C31\u7EEA":"\u90E8\u5206\u80FD\u529B\u53EF\u7528";return(0,h.jsxs)("div",{className:"oh-story-production-status",children:[(0,h.jsx)("div",{className:"oh-story-status-pills",children:(0,h.jsxs)("button",{type:"button",className:"oh-story-status-pill","data-tone":R,"aria-expanded":i,"aria-controls":"oh-story-production-details",onClick:()=>{g(T=>!T)},children:[(0,h.jsx)("i",{"aria-hidden":"true"}),"\u5236\u4F5C\u8BE6\u60C5",(0,h.jsx)("em",{children:C}),(0,h.jsx)("b",{"aria-hidden":"true"})]})}),i&&(0,h.jsxs)("div",{id:"oh-story-production-details",className:"oh-story-production-details",children:[n==="failed"&&(0,h.jsxs)("section",{className:"oh-story-status-panel","aria-label":"\u5236\u4F5C\u73AF\u5883\u68C0\u67E5\u5931\u8D25",children:[(0,h.jsx)("p",{children:"\u6682\u65F6\u65E0\u6CD5\u68C0\u67E5\u5236\u4F5C\u80FD\u529B\u3002\u4F60\u4ECD\u53EF\u6574\u7406\u753B\u5E03\u548C\u7D20\u6750\uFF0C\u751F\u6210\u524D\u8BF7\u91CD\u65B0\u68C0\u67E5\u3002"}),(0,h.jsx)("button",{type:"button",onClick:()=>{a(void 0),s(T=>T+1)},children:"\u91CD\u65B0\u68C0\u67E5"})]}),typeof n=="object"&&(0,h.jsxs)("section",{className:"oh-story-status-panel",id:"oh-story-production-environment","aria-label":"\u5A92\u4F53\u751F\u6210\u73AF\u5883\u8BE6\u60C5",children:[(0,h.jsxs)("ul",{className:"oh-story-provider-list",children:[(0,h.jsxs)("li",{"data-ready":n.python.ok||void 0,"data-error":!n.python.ok||void 0,children:[(0,h.jsx)("i",{"aria-hidden":"true"}),(0,h.jsx)("span",{children:"\u8FD0\u884C"}),(0,h.jsx)("strong",{children:"Python"}),(0,h.jsx)("small",{children:n.python.ok?n.python.version:`${n.python.version??"\u672A\u627E\u5230"} \xB7 \u77ED\u5267\u811A\u672C\u9700\u8981 ${n.python.minimum}+`})]}),n.adapters.map(T=>(0,h.jsxs)("li",{"data-ready":T.configured||void 0,children:[(0,h.jsx)("i",{"aria-hidden":"true"}),(0,h.jsx)("span",{children:nd[T.modality]}),(0,h.jsx)("strong",{children:T.label}),T.configured?(0,h.jsx)("small",{children:"\u5DF2\u914D\u7F6E"}):(0,h.jsxs)("small",{children:["\u7F3A ",T.missing.map(O=>(0,h.jsx)("code",{children:O},O))]})]},T.name))]}),(0,h.jsxs)("p",{children:["DeepSeek \u53EA\u8D1F\u8D23\u5199\u5267\u672C\u3001\u5206\u955C\u548C\u63D0\u793A\u8BCD\uFF0C\u56FE\u7247\u3001\u89C6\u9891\u3001\u8BED\u97F3\u4E0E\u914D\u4E50\u7531\u4E0A\u65B9\u4F9B\u5E94\u5546\u63A5\u53E3\u751F\u6210\u3002\u8BF7\u5728\u542F\u52A8 DSH \u524D\u901A\u8FC7\u5BBF\u4E3B\u673A\u73AF\u5883\u53D8\u91CF\u914D\u7F6E\u6240\u9700 Key",f===0?"\uFF08\u5F53\u524D\u5747\u672A\u914D\u7F6E\uFF0C\u8C03\u7528\u5916\u90E8\u63A5\u53E3\u524D\u4F1A\u5148\u505C\u4E0B\u63D0\u9192\uFF09":"","\uFF0C\u53D8\u91CF\u8BF4\u660E\u89C1 README\u300C\u5A92\u4F53 API\u300D\u4E00\u8282\u3002"]}),(0,h.jsxs)("footer",{children:[(0,h.jsxs)("span",{children:["Adapter \u914D\u7F6E",n.adapterConfig.generated?"\uFF08\u81EA\u52A8\u767B\u8BB0\uFF09":"\uFF08\u81EA\u5B9A\u4E49\uFF09",n.adapterConfig.ok?"":" \xB7 \u5199\u5165\u5931\u8D25"]}),(0,h.jsx)("code",{title:n.adapterConfig.path,children:b}),(0,h.jsx)("button",{type:"button",onClick:()=>{navigator.clipboard.writeText(n.adapterConfig.path).then(()=>{c(!0),setTimeout(()=>{c(!1)},1500)})},children:m?"\u5DF2\u590D\u5236":"\u590D\u5236\u8DEF\u5F84"})]})]}),o.length>0&&(0,h.jsxs)("section",{className:"oh-story-status-panel oh-story-production-diagnostics",id:"oh-story-production-diagnostics","aria-label":"\u6587\u6863\u683C\u5F0F\u63D0\u9192",children:[(0,h.jsx)("ul",{children:o.slice(0,8).map(T=>(0,h.jsxs)("li",{"data-severity":T.severity,children:[(0,h.jsxs)("button",{type:"button",onClick:()=>{t({path:T.path,offset:T.offset,id:T.targetId??T.code})},children:[T.path.split("/").at(-1),(0,h.jsxs)("span",{children:[":",T.line]})]}),(0,h.jsx)("span",{children:T.message})]},`${T.path}:${String(T.offset)}:${T.code}`))}),o.length>8&&(0,h.jsxs)("p",{children:["\u53E6\u6709 ",o.length-8," \u9879\uFF0C\u8BF7\u6309\u6587\u6863\u4F4D\u7F6E\u4FEE\u590D\u3002"]})]})]})]})}function ir(e){let[o,t]=(0,be.useState)(),n=(0,be.useRef)(e.jobs),a=(0,be.useCallback)(u=>{n.current=u,e.onJobsChange(u)},[e.onJobsChange]);(0,be.useEffect)(()=>{n.current=e.jobs},[e.jobs]),(0,be.useEffect)(()=>{let u=Aa(e.production.shots.map(b=>b.id),e.sequence,e.versions,e.selections,e.production.episodeDirectory);JSON.stringify(u)!==JSON.stringify(e.sequence)&&e.onSequenceChange(u)},[e.production.shots,e.selections,e.sequence,e.versions]),(0,be.useEffect)(()=>{let u=Va(e.jobs,e.queue,e.sessionRunning,e.versions);JSON.stringify(u)!==JSON.stringify(e.jobs)&&a(u)},[a,e.jobs,e.queue,e.sessionRunning,e.versions]);let r=async(u,b=[])=>{a([...n.current,{...u,status:"awaiting_confirmation"}]),e.section!=="canvas"&&e.onSectionChange("tasks");try{await e.onDispatchPrompt(er(e.production,u,b)),t(`${Me(e.production,u.targetId)} \u6B63\u5728\u51C6\u5907\uFF1B\u8BF7\u5728 Chat \u6838\u5BF9\u540E\u786E\u8BA4\u3002`)}catch(R){a(n.current.map(C=>C.id===u.id?{...C,status:"failed",error:R instanceof Error?R.message:String(R)}:C))}},s=async(u,b,R)=>{if(R.trim()===""){t(`${u} \u6CA1\u6709\u53EF\u6295\u4EA7\u63D0\u793A\u8BCD\u3002`);return}let C=xo({id:crypto.randomUUID(),targetId:u,kind:b,prompt:R});await r(C,b==="video"?Ma(u,e.production,e.versions,e.selections,e.libraryVersions,e.manualReferences):[])},i=async u=>{let b=e.production.shots.flatMap(C=>{let T=u==="image"?C.keyframePrompt:C.motion?.prompt;return T===void 0?[]:[{id:C.id,prompt:T}]});if(b.length===0){t(u==="image"?"\u6CA1\u6709\u53EF\u6295\u4EA7\u7684\u5173\u952E\u5E27\u63D0\u793A\u8BCD\u3002":"\u6CA1\u6709\u53EF\u6295\u4EA7\u7684\u89C6\u9891\u63D0\u793A\u8BCD\u3002");return}let R=xo({id:crypto.randomUUID(),targetId:u==="image"?"BATCH-KEYFRAMES":"BATCH-VIDEOS",kind:u,prompt:b.map(C=>`${C.id}
${C.prompt}`).join(`

`),expectedOutputs:b.length});a([...n.current,{...R,status:"awaiting_confirmation"}]),e.onSectionChange("tasks");try{await e.onDispatchPrompt(or(e.production,R,b)),t(`${String(b.length)} \u4E2A\u955C\u5934\u6B63\u5728\u51C6\u5907\u540C\u4E00\u6279\u6B21\u9884\u68C0\uFF1B\u8BF7\u5728 Chat \u6838\u5BF9\u540E\u660E\u786E\u786E\u8BA4\u3002`)}catch(C){a(n.current.map(T=>T.id===R.id?{...T,status:"failed",error:C instanceof Error?C.message:String(C)}:T))}},g=async u=>{let b=od(e.production,e.sequence,e.versions);a([...n.current,u]),e.onSectionChange("tasks");try{await e.onDispatchPrompt(tr(e.production,u,b)),t("\u6210\u7247\u4EFB\u52A1\u5DF2\u63D0\u4EA4\uFF1B\u6D89\u53CA\u6587\u4EF6\u3001\u6E32\u67D3\u548C\u5199\u5165\u7684\u64CD\u4F5C\u4ECD\u4F1A\u6309\u53F3\u4FA7\u5BF9\u8BDD\u4E2D\u7684\u786E\u8BA4\u6D41\u7A0B\u6267\u884C\u3002")}catch(R){a(n.current.map(C=>C.id===u.id?{...C,status:"failed",error:R instanceof Error?R.message:String(R)}:C))}},m=async u=>{try{await e.onCancelTurn(),a(n.current.map(b=>b.id===u.id?{...b,status:"canceled",progress:0}:b)),t("\u5DF2\u8BF7\u6C42\u505C\u6B62\u5F53\u524D\u751F\u6210\uFF1B\u961F\u5217\u4E2D\u7684\u5176\u4ED6\u4EFB\u52A1\u4F1A\u4FDD\u7559\u3002")}catch(b){t(b instanceof Error?b.message:String(b))}},c=async(u,b)=>{try{await e.onRemoveQueued(b),a(n.current.map(R=>R.id===u.id?{...R,status:"canceled",progress:0}:R)),t(`${u.targetId} \u5DF2\u4ECE DSH Queue \u79FB\u9664\u3002`)}catch(R){t(R instanceof Error?R.message:String(R))}},f=()=>{let u=Ft(e.sequence,e.versions,e.production.episodeDirectory);if(u.length>0){t(u[0]);return}let b=`${e.production.episodeDirectory}/${ed}`;g(xo({id:crypto.randomUUID(),targetId:e.production.episodeDirectory,kind:"composition",prompt:"\u6309\u6210\u7247\u987A\u5E8F\u5408\u6210",outputPath:b,supersededOutputIds:e.libraryVersions.flatMap(R=>R.path===b?[R.id]:[])}))},I=e.jobs.filter(u=>u.status==="awaiting_confirmation"||u.status==="running"||u.status==="pending").length,w=td(e.production,e.documents);return(0,h.jsxs)("div",{className:"oh-story-production",children:[(0,h.jsxs)("div",{className:"oh-story-production-bar",children:[(0,h.jsx)("div",{className:"oh-story-production-tabs",role:"tablist","aria-label":"\u77ED\u5267\u751F\u4EA7\u89C6\u56FE",children:nr.map(u=>(0,h.jsx)("button",{type:"button",role:"tab",tabIndex:e.section===u||e.section==="shots"&&u==="canvas"?0:-1,"aria-selected":e.section===u,onKeyDown:b=>{We(b,nr,u,e.onSectionChange)},onClick:()=>{e.onSectionChange(u)},children:Qs[u]},u))}),(0,h.jsxs)("div",{className:"oh-story-production-meta",children:[(0,h.jsxs)("span",{className:"oh-story-production-summary",children:[e.production.shots.length," \u4E2A\u955C\u5934 \xB7 ",e.production.assets.length+e.production.visualAssets.length," \u9879\u7D20\u6750",I>0?` \xB7 ${String(I)} \u9879\u5236\u4F5C\u4E2D`:""]}),(0,h.jsx)("button",{type:"button",className:"oh-story-shot-list-trigger","aria-pressed":e.section==="shots",onClick:()=>{e.onSectionChange("shots")},children:"\u955C\u5934\u6E05\u5355"}),(0,h.jsx)("button",{type:"button",onClick:e.onRefresh,children:"\u5237\u65B0"})]})]}),(0,h.jsx)(ad,{sessionId:e.sessionId,diagnostics:e.production.diagnostics,onNavigate:e.onNavigate}),o!==void 0&&(0,h.jsxs)("div",{className:"oh-story-production-notice",role:"status",children:[(0,h.jsx)("span",{children:o}),(0,h.jsx)("button",{type:"button","aria-label":"\u5173\u95ED\u63D0\u793A",onClick:()=>{t(void 0)},children:"\xD7"})]}),e.section==="shots"&&(0,h.jsx)(rd,{...e,onCreateJob:s,onBatch:i}),e.section==="assets"&&(0,h.jsx)(id,{...e,onCreateJob:s}),e.section==="tasks"&&(0,h.jsx)(sd,{production:e.production,jobs:e.jobs,queue:e.queue,sessionRunning:e.sessionRunning,onCancel:m,onRemoveQueued:c}),e.section==="sequence"&&(0,h.jsx)(dd,{...e,production:e.production,episodeDirectory:e.production.episodeDirectory,onCompose:f}),e.section==="canvas"&&(w?(0,h.jsx)(Ka,{production:e.production,documents:e.documents,selectedId:e.selectedId,canvas:e.canvas,viewport:e.viewport,versions:e.versions,jobs:e.jobs,selections:e.selections,onSelectionsChange:e.onSelectionsChange,onPrepare:s,onOpenMedia:e.onOpenMedia,onContinueInChat:e.onContinueInChat,onSelect:e.onSelect,onNavigate:e.onNavigate,onCanvasChange:e.onCanvasChange,onViewportChange:e.onViewportChange}):(0,h.jsx)("section",{className:"oh-story-canvas-shell","aria-label":"\u77ED\u5267\u7D20\u6750\u4E0E\u955C\u5934\u5173\u7CFB\u753B\u5E03",children:(0,h.jsx)(Xt,{document:`${e.production.episodeDirectory}/\u5206\u955C.md`,documentPaths:e.production.documentPaths,what:"\u5173\u7CFB",skill:"/short-drama-storyboard",onNavigate:e.onNavigate})}))]})}function rd(e){let o=sr(e.selectedId);return e.production.shots.length===0?(0,h.jsx)("section",{className:"oh-story-shot-board",children:(0,h.jsx)(Xt,{document:`${e.production.episodeDirectory}/\u5206\u955C.md`,documentPaths:e.production.documentPaths,what:"\u955C\u5934",skill:"/short-drama-storyboard",onNavigate:e.onNavigate})}):(0,h.jsxs)("section",{className:"oh-story-shot-board",children:[(0,h.jsxs)("div",{className:"oh-story-production-actions",children:[(0,h.jsx)("button",{type:"button",onClick:()=>{e.onBatch("image")},children:"\u51C6\u5907\u6279\u91CF\u5173\u952E\u5E27"}),(0,h.jsx)("button",{type:"button",onClick:()=>{e.onBatch("video")},children:"\u51C6\u5907\u6279\u91CF\u89C6\u9891"})]}),(0,h.jsx)("div",{className:"oh-story-shot-grid",children:e.production.shots.map(t=>{let n=Sa(t),a=e.versions.filter(g=>g.targetId===t.id),r=He(t.id,e.versions,e.selections,"image"),s=He(t.id,e.versions,e.selections,"video"),i=s??r;return(0,h.jsxs)("article",{className:"oh-story-shot-card",role:"button",tabIndex:0,"aria-pressed":e.selectedId===t.id,"aria-label":`\u9009\u4E2D\u955C\u5934 ${t.title}`,ref:e.selectedId===t.id?o:void 0,"data-selected":e.selectedId===t.id||void 0,onKeyDown:g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),e.onSelect(t.id))},onClick:()=>{e.onSelect(t.id)},children:[i===void 0?(0,h.jsxs)("div",{className:"oh-story-shot-placeholder",children:[(0,h.jsx)("strong",{children:t.title}),(0,h.jsx)("span",{children:"\u8FD8\u6CA1\u6709\u753B\u9762"})]}):(0,h.jsx)(wo,{version:i}),(0,h.jsxs)("header",{children:[(0,h.jsx)("h3",{children:t.title}),(0,h.jsx)("span",{children:t.durationSeconds===void 0?"\u65F6\u957F\u5F85\u5B9A":`${String(t.durationSeconds)} \u79D2`})]}),t.shotSpec!==void 0&&(0,h.jsx)("p",{children:t.shotSpec}),(0,h.jsxs)("dl",{children:[(0,h.jsx)("dt",{children:"\u8D77"}),(0,h.jsx)("dd",{children:t.start??"\u672A\u586B\u5199"}),(0,h.jsx)("dt",{children:"\u7EC8"}),(0,h.jsx)("dd",{children:t.end??"\u672A\u586B\u5199"})]}),(0,h.jsxs)("div",{className:"oh-story-shot-status",children:[(0,h.jsx)(rr,{label:"\u5173\u952E\u5E27",ready:r!==void 0}),(0,h.jsx)(rr,{label:"\u89C6\u9891",ready:s!==void 0}),(0,h.jsx)("span",{children:a.length===0?"\u6682\u65E0\u6210\u679C":`${String(a.length)} \u4E2A\u7248\u672C`})]}),(0,h.jsxs)("div",{className:"oh-story-reference-links",children:[t.sceneIds.length>0?t.sceneIds.map(g=>(0,h.jsx)(Zt,{id:g,production:e.production,onNavigate:e.onNavigate},g)):t.source!==void 0&&(0,h.jsx)(Zt,{id:t.source,production:e.production,onNavigate:e.onNavigate}),t.references.map(g=>(0,h.jsx)(Zt,{id:g,production:e.production,onNavigate:e.onNavigate},g))]}),(0,h.jsxs)("div",{className:"oh-story-card-actions",children:[t.keyframePrompt!==void 0&&(0,h.jsx)("button",{type:"button",onClick:g=>{g.stopPropagation(),e.onCreateJob(t.id,"image",t.keyframePrompt??"")},children:"\u51C6\u5907\u5173\u952E\u5E27"}),t.motion?.prompt!==void 0&&(0,h.jsx)("button",{type:"button",onClick:g=>{g.stopPropagation(),e.onCreateJob(t.id,"video",t.motion?.prompt??"")},children:"\u51C6\u5907\u89C6\u9891"})]}),a.length>1&&(0,h.jsx)(dr,{targetId:t.id,versions:a,selections:e.selections,onSelectionsChange:e.onSelectionsChange}),(0,h.jsxs)("details",{className:"oh-story-card-details",onClick:g=>{g.stopPropagation()},children:[(0,h.jsx)("summary",{children:"\u5236\u4F5C\u8BE6\u60C5"}),(0,h.jsx)("p",{children:t.id}),(0,h.jsxs)("p",{children:["\u5173\u952E\u5E27\u63D0\u793A\u8BCD",n.keyframe?"\u5DF2\u5907":"\u5F85\u8865"," \xB7 \u8FD0\u52A8\u63D0\u793A\u8BCD",n.motion?"\u5DF2\u5907":"\u5F85\u8865"," \xB7 \u53C2\u8003",n.references?"\u5DF2\u5173\u8054":"\u5F85\u8865"]}),(0,h.jsx)("button",{type:"button",onClick:()=>{e.onNavigate({path:t.path,offset:t.offset,id:t.id})},children:"\u67E5\u770B\u539F\u6587"})]})]},t.id)})})]})}function id(e){let[o,t]=(0,be.useState)(""),[n,a]=(0,be.useState)("all"),r=[...e.production.assets,...e.production.visualAssets.filter(f=>!e.production.assets.some(I=>I.title===f.title))],s=o.trim().toLocaleLowerCase(),i=e.libraryVersions.filter(f=>(n==="all"||f.kind===n)&&(s===""||`${Me(e.production,f.targetId)} ${f.targetId} ${f.path??""}`.toLocaleLowerCase().includes(s))),g=sr(e.selectedId),m=e.selectedId?.startsWith("SHOT-")===!0?e.selectedId:void 0,c=f=>{if(m===void 0)return;let I=e.manualReferences[m]??[],w=I.includes(f)?I.filter(b=>b!==f):[...I,f],u=Object.fromEntries(Object.entries(e.manualReferences).map(([b,R])=>[b,[...R]]));e.onManualReferencesChange({...u,[m]:w})};return r.length===0&&e.libraryVersions.length===0?(0,h.jsx)("section",{className:"oh-story-assets",children:(0,h.jsx)(Xt,{document:`${e.production.episodeDirectory}/\u56FE\u7247\u63D0\u793A\u8BCD.md`,documentPaths:e.production.documentPaths,what:"\u7D20\u6750",skill:"/short-drama-image-prompts",onNavigate:e.onNavigate})}):(0,h.jsxs)("section",{className:"oh-story-assets",children:[(0,h.jsx)("div",{className:"oh-story-asset-grid",children:r.map(f=>{let I="stableId"in f?f.description:f.prompt,w="stableId"in f?f.description.split(`
`).find(R=>R.trim()!==""):f.purpose??f.reference,u=e.versions.filter(R=>R.targetId===f.id),b=He(f.id,e.versions,e.selections,"image");return(0,h.jsxs)("article",{className:"oh-story-asset-card",ref:e.selectedId===f.id?g:void 0,"data-selected":e.selectedId===f.id||void 0,children:[(0,h.jsxs)("div",{className:"oh-story-asset-media","data-kind":f.kind,children:[b===void 0?(0,h.jsx)("div",{className:"oh-story-asset-placeholder","aria-hidden":"true",children:f.kind==="character"?"\u4EBA":f.kind==="scene"?"\u666F":f.kind==="prop"?"\u7269":"\u8BBE"}):(0,h.jsx)(wo,{version:b}),(0,h.jsx)("small",{children:ar[f.kind]})]}),(0,h.jsxs)("div",{className:"oh-story-asset-head",children:[(0,h.jsx)("h3",{children:f.title}),(0,h.jsx)("span",{children:b===void 0?"\u5F85\u751F\u6210":"\u5DF2\u751F\u6210"})]}),(0,h.jsx)("p",{className:"oh-story-asset-description",children:w??`${ar[f.kind]}\u53C2\u8003\u7D20\u6750`}),(0,h.jsx)("div",{className:"oh-story-card-actions",children:I!==void 0&&(0,h.jsx)("button",{type:"button",onClick:()=>{e.onCreateJob(f.id,"image",I)},children:"\u51C6\u5907\u7D20\u6750"})}),u.length>0&&(0,h.jsx)(dr,{targetId:f.id,versions:u,selections:e.selections,onSelectionsChange:e.onSelectionsChange}),(0,h.jsxs)("details",{className:"oh-story-card-details",children:[(0,h.jsx)("summary",{children:"\u5236\u4F5C\u8BE6\u60C5"}),(0,h.jsx)("p",{children:f.id}),(0,h.jsx)("button",{type:"button",onClick:()=>{e.onNavigate({path:f.path,offset:f.offset,id:f.id})},children:"\u67E5\u770B\u539F\u6587"})]})]},f.id)})}),(0,h.jsxs)("div",{className:"oh-story-media-library",children:[(0,h.jsxs)("header",{children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("strong",{children:"\u9879\u76EE\u5A92\u4F53\u5E93"}),(0,h.jsxs)("span",{children:[i.length,"/",e.libraryVersions.length," \u9879 \xB7 \u53EF\u8DE8\u96C6\u590D\u7528"]})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)("input",{"aria-label":"\u641C\u7D22\u9879\u76EE\u5A92\u4F53",value:o,placeholder:"\u641C\u7D22\u540D\u79F0\u6216\u6587\u4EF6",onChange:f=>{t(f.target.value)}}),(0,h.jsxs)("select",{"aria-label":"\u7B5B\u9009\u5A92\u4F53\u7C7B\u578B",value:n,onChange:f=>{a(f.target.value)},children:[(0,h.jsx)("option",{value:"all",children:"\u5168\u90E8"}),(0,h.jsx)("option",{value:"image",children:"\u56FE\u7247"}),(0,h.jsx)("option",{value:"video",children:"\u89C6\u9891"})]})]})]}),(0,h.jsxs)("p",{className:"oh-story-projection-note",children:[m===void 0?"\u5148\u5728\u955C\u5934\u6E05\u5355\u91CC\u9009\u4E2D\u4E00\u4E2A\u955C\u5934\uFF0C\u518D\u5230\u8FD9\u91CC\u628A\u5DF2\u6709\u56FE\u7247\u8BBE\u4E3A\u8865\u5145\u53C2\u8003\u3002":`\u53EF\u628A\u4E0B\u9762\u7684\u56FE\u7247\u8BBE\u4E3A\u300C${Me(e.production,m)}\u300D\u7684\u8865\u5145\u53C2\u8003\u3002`,"\u8865\u5145\u53C2\u8003\u53EA\u63D0\u793A Agent \u6838\u5BF9\uFF1B\u5199\u8FDB\u6765\u6E90\u6761\u76EE\u7684\u300C\u8F93\u5165\u53C2\u8003\u56FE\u300D\u540E\u624D\u4F1A\u9001\u8FDB\u751F\u4EA7\u3002"]}),(0,h.jsx)("div",{className:"oh-story-media-library-grid",children:i.map(f=>{let I=m!==void 0&&(e.manualReferences[m]??[]).includes(f.id);return(0,h.jsxs)("article",{children:[(0,h.jsx)(wo,{version:f}),(0,h.jsx)("strong",{children:Me(e.production,f.targetId)}),(0,h.jsxs)("details",{children:[(0,h.jsx)("summary",{children:"\u6587\u4EF6\u8BE6\u60C5"}),(0,h.jsx)("span",{title:f.path,children:f.path})]}),(0,h.jsxs)("footer",{children:[f.path!==void 0&&(0,h.jsx)("button",{type:"button",onClick:()=>{e.onOpenMedia(f.path)},children:"\u6253\u5F00\u6587\u4EF6"}),m!==void 0&&f.kind==="image"&&(0,h.jsx)("button",{type:"button","aria-pressed":I,"aria-label":`${I?"\u53D6\u6D88":"\u8BBE\u4E3A"} ${Me(e.production,m)} \u7684\u53C2\u8003`,title:"\u63D0\u793A Agent \u6838\u5BF9\uFF1B\u5199\u8FDB\u300C\u8F93\u5165\u53C2\u8003\u56FE\u300D\u540E\u624D\u4F1A\u9001\u8FDB\u751F\u4EA7",onClick:()=>{c(f.id)},children:I?"\u5DF2\u8BBE\u8865\u5145\u53C2\u8003":"\u8BBE\u4E3A\u8865\u5145\u53C2\u8003"})]})]},f.id)})})]})]})}function sd({production:e,jobs:o,queue:t,sessionRunning:n,onCancel:a,onRemoveQueued:r}){let s=Oa(o,t,n);return(0,h.jsxs)("section",{className:"oh-story-task-board",children:[(0,h.jsx)("p",{className:"oh-story-board-hint",children:"\u8FD9\u91CC\u8DDF\u8E2A\u56FE\u7247\u3001\u89C6\u9891\u4E0E\u6210\u7247\u4EFB\u52A1\u3002\u6BCF\u9879\u90FD\u4F1A\u5148\u7ED9\u51FA\u9884\u89C8\uFF0C\u518D\u7531\u4F60\u5728\u53F3\u4FA7\u5BF9\u8BDD\u4E2D\u786E\u8BA4\uFF1B\u8BED\u97F3\u548C\u97F3\u4E50\u4E5F\u5728\u53F3\u4FA7\u5BF9\u8BDD\u4E2D\u5B8C\u6210\u3002"}),o.length===0?(0,h.jsxs)("div",{className:"oh-story-production-empty",children:[(0,h.jsx)("strong",{children:"\u8FD8\u6CA1\u6709\u751F\u6210\u8BB0\u5F55"}),(0,h.jsx)("p",{children:"\u4ECE\u753B\u5E03\u3001\u955C\u5934\u6E05\u5355\u6216\u7D20\u6750\u9875\u51C6\u5907\u753B\u9762\uFF0C\u786E\u8BA4\u540E\u7684\u4EFB\u52A1\u4F1A\u51FA\u73B0\u5728\u8FD9\u91CC\u3002"})]}):[...o].reverse().map(i=>{let g=Wo(i.id,t),m=g===void 0?Zs[i.status]:"\u751F\u6210\u961F\u5217";return(0,h.jsxs)("article",{"data-job-id":i.id,"data-status":i.status,children:[(0,h.jsxs)("header",{children:[(0,h.jsx)("strong",{children:Me(e,i.targetId)}),(0,h.jsx)("span",{children:Xs[i.kind]}),(0,h.jsx)("span",{children:m})]}),(0,h.jsx)("div",{className:"oh-story-task-progress",children:(0,h.jsx)("i",{style:{width:`${String(i.progress)}%`}})}),(0,h.jsxs)("details",{children:[(0,h.jsx)("summary",{children:"\u5236\u4F5C\u8BE6\u60C5"}),(0,h.jsx)("p",{children:i.targetId}),(0,h.jsxs)("p",{children:["\u4EFB\u52A1\uFF1A",i.id]}),(0,h.jsx)("p",{children:i.prompt})]}),i.expectedOutputs>1&&(0,h.jsxs)("small",{children:[i.completedOutputs,"/",i.expectedOutputs," \u9879\u6210\u679C"]}),i.error!==void 0&&(0,h.jsx)("div",{className:"oh-story-error",children:i.error}),i.output!==void 0&&(0,h.jsx)(wo,{version:i.output}),(0,h.jsxs)("footer",{children:[g!==void 0&&(i.status==="awaiting_confirmation"||i.status==="pending"||i.status==="running")&&(0,h.jsx)("button",{type:"button",onClick:()=>{r(i,g.id)},children:"\u4ECE\u751F\u6210\u961F\u5217\u79FB\u9664"}),s===i.id&&(0,h.jsx)("button",{type:"button",onClick:()=>{a(i)},children:"\u505C\u6B62\u5F53\u524D\u751F\u6210"})]})]},i.id)})]})}function dd(e){let o=$a(e.jobs),t=e.versions.filter(i=>e.episodeDirectory===void 0||rt(i.path,e.episodeDirectory)),n=Ft(e.sequence,t,e.episodeDirectory),a=new Map(t.map(i=>[i.id,i])),r=(i,g)=>{let m=e.sequence[i],c=e.sequence[i+g];m!==void 0&&c!==void 0&&e.onSequenceChange(Wa(e.sequence,i,i+g))},s=(i,g)=>{e.onSequenceChange(e.sequence.map(m=>m.shotId!==i?m:g===""?{shotId:m.shotId,versionId:m.versionId}:{...m,sourceVersionId:g,versionId:g}))};return(0,h.jsxs)("section",{className:"oh-story-sequence",children:[(0,h.jsxs)("div",{className:"oh-story-sequence-summary",children:[(0,h.jsxs)("strong",{children:[e.sequence.length," \u4E2A\u955C\u5934"]}),(0,h.jsx)("span",{children:e.sequence.length===0?"\u8FD8\u6CA1\u6709\u955C\u5934":o?"\u6210\u7247\u4EFB\u52A1\u8FDB\u884C\u4E2D":n.length===0?"\u5DF2\u53EF\u5408\u6210":`${String(n.length)} \u4E2A\u963B\u585E\u9879`}),(0,h.jsx)("button",{type:"button",disabled:o||n.length>0||e.sequence.length<2,onClick:e.onCompose,children:"\u5408\u6210\u6210\u7247"})]}),n.length>0&&(0,h.jsxs)("ul",{className:"oh-story-sequence-issues",children:[n.slice(0,3).map(i=>(0,h.jsx)("li",{children:i},i)),n.length>3&&(0,h.jsxs)("li",{children:["\u53E6\u6709 ",n.length-3," \u4E2A\u963B\u585E\u9879\uFF0C\u8BF7\u5728\u4E0B\u65B9\u955C\u5934\u884C\u8865\u9F50\u7D20\u6750\u3002"]})]}),(0,h.jsx)("ol",{children:e.sequence.map((i,g)=>{let m=i.versionId===void 0?void 0:a.get(i.versionId),c=t.filter(w=>w.path!==void 0&&Gt(i.shotId,w)),f=i.sourceVersionId!==void 0&&!c.some(w=>w.id===i.sourceVersionId),I=Me(e.production,i.shotId);return(0,h.jsxs)("li",{children:[(0,h.jsx)("span",{children:String(g+1).padStart(2,"0")}),m===void 0?(0,h.jsx)("div",{className:"oh-story-sequence-missing",children:"\u7F3A\u5C11\u7D20\u6750"}):(0,h.jsx)(wo,{version:m,interactive:!1}),(0,h.jsxs)("div",{className:"oh-story-sequence-main",children:[(0,h.jsx)("strong",{title:i.shotId,children:I}),(0,h.jsxs)("select",{"aria-label":`\u9009\u62E9 ${I} \u6210\u7247\u7D20\u6750`,value:i.sourceVersionId??"",onChange:w=>{s(i.shotId,w.target.value)},children:[(0,h.jsx)("option",{value:"",children:"\u81EA\u52A8\uFF08\u89C6\u9891\u4F18\u5148\uFF09"}),f&&(0,h.jsx)("option",{value:i.sourceVersionId,disabled:!0,children:"\u5DF2\u9009\u7D20\u6750\u4E0D\u53EF\u7528"}),c.map(w=>(0,h.jsxs)("option",{value:w.id,children:[Me(e.production,w.targetId)," \xB7 ",w.kind==="video"?"\u89C6\u9891":"\u9759\u5E27"," \xB7 ",w.path?.split("/").at(-1)]},w.id))]})]}),(0,h.jsxs)("div",{className:"oh-story-sequence-move",children:[(0,h.jsx)("button",{type:"button","aria-label":`\u4E0A\u79FB ${I}`,disabled:g===0,onClick:()=>{r(g,-1)},children:"\u2191"}),(0,h.jsx)("button",{type:"button","aria-label":`\u4E0B\u79FB ${I}`,disabled:g===e.sequence.length-1,onClick:()=>{r(g,1)},children:"\u2193"})]})]},i.shotId)})})]})}function sr(e){let o=(0,be.useRef)(null);return(0,be.useEffect)(()=>{o.current?.scrollIntoView({block:"nearest"})},[e]),o}function rr({label:e,ready:o}){return(0,h.jsxs)("span",{"data-ready":o,"aria-label":`${e}${o?"\u5DF2\u751F\u6210":"\u5F85\u751F\u6210"}`,children:[(0,h.jsx)("i",{"aria-hidden":"true",children:o?"\u2713":"\u2014"}),e,o?"\u5DF2\u751F\u6210":"\u5F85\u751F\u6210"]})}function Xt({document:e,documentPaths:o,what:t,skill:n,onNavigate:a}){let r=o.includes(e);return(0,h.jsxs)("div",{className:"oh-story-production-empty",children:[(0,h.jsxs)("strong",{children:["\u8FD8\u6CA1\u6709\u53EF\u5C55\u793A\u7684",t,"\u3002"]}),(0,h.jsx)("p",{children:r?`${e} \u5DF2\u5B58\u5728\uFF0C\u4F46\u6CA1\u6709\u89E3\u6790\u51FA\u6761\u76EE\u3002\u8BF7\u68C0\u67E5\u4E8C\u7EA7\u6807\u9898\u662F\u5426\u4E3A\u7A33\u5B9A\u7684 ID \u5F62\u5F0F\u3002`:`\u672C\u96C6\u8FD8\u6CA1\u6709 ${e}\u3002\u5728\u53F3\u4FA7 Chat \u7528 ${n} \u5199\u597D\u8FD9\u4EFD\u6587\u6863\u540E\uFF0C\u8FD9\u91CC\u4F1A\u81EA\u52A8\u51FA\u73B0\u3002`}),r&&(0,h.jsxs)("button",{type:"button",onClick:()=>{a({path:e,offset:0,id:e})},children:["\u6253\u5F00 ",e.split("/").at(-1)]})]})}function Zt({id:e,production:o,onNavigate:t}){let n=o.targets.get(e),a=Me(o,e);return(0,h.jsx)("button",{type:"button",title:e,disabled:n===void 0,onClick:r=>{r.stopPropagation(),n!==void 0&&t(n)},children:a===e?"\u5173\u8054\u539F\u6587":a})}function wo({version:e,interactive:o=!0}){return e.kind==="image"?(0,h.jsx)("img",{className:"oh-story-media-preview",src:e.url,alt:e.targetId,loading:"lazy"}):(0,h.jsx)("video",{className:"oh-story-media-preview",src:e.url,controls:o,muted:!o,preload:"metadata"})}function dr({targetId:e,versions:o,selections:t,onSelectionsChange:n}){let a=He(e,o,t)?.id;return(0,h.jsx)("div",{className:"oh-story-version-strip","aria-label":`${e} \u6210\u679C\u7248\u672C`,children:o.map((r,s)=>(0,h.jsxs)("button",{type:"button","aria-pressed":r.id===a,"aria-label":`\u9009\u62E9 ${e} \u7248\u672C ${String(s+1)}`,"data-selected":r.id===a||void 0,onClick:i=>{i.stopPropagation(),n({...t,[e]:r.id})},children:[(0,h.jsx)(wo,{version:r,interactive:!1}),(0,h.jsxs)("span",{children:["V",String(s+1)]})]},r.id))})}var ut="oh_story_production";function en(e,o){let t=e?.trim();if(!t)throw new Error(`oh_story_production ${o} is required for this action.`);if(t.length>512)throw new Error(`oh_story_production ${o} is too long.`);return t}function lr(e){let o=e.episode.trim().replaceAll("\\","/").replace(/\/$/u,"");if(!/^剧集\/EP\d{3,}$/u.test(o))throw new Error("oh_story_production episode must use the creator path form \u5267\u96C6/EP001.");if(e.action==="open_section"){if(e.section===void 0)throw new Error("oh_story_production section is required for open_section.");return{action:e.action,episode:o,section:e.section}}if(e.action==="focus_target")return{action:e.action,episode:o,targetId:en(e.targetId,"targetId"),section:e.section};if(e.action==="set_sequence"){let a=e.shotIds?.map(r=>r.trim()).filter(r=>r!=="")??[];if(a.length===0)throw new Error("oh_story_production shotIds must contain at least one shot for set_sequence.");if(a.length>500||new Set(a).size!==a.length||a.some(r=>!/^SHOT-[A-Z0-9-]+$/u.test(r)))throw new Error("oh_story_production shotIds must be unique canonical SHOT-* identifiers.");return{action:e.action,episode:o,shotIds:a}}let t=e.expectedOutputs;if(t!==void 0&&(!Number.isInteger(t)||t<1||t>500))throw new Error("oh_story_production expectedOutputs must be an integer between 1 and 500.");if(e.jobKind===void 0)throw new Error("oh_story_production jobKind is required for track_job.");let n=e.prompt?.trim();return{action:e.action,episode:o,jobId:en(e.jobId,"jobId"),targetId:en(e.targetId,"targetId"),jobKind:e.jobKind,expectedOutputs:t,prompt:n===""?void 0:n}}function ld(e){if(!(!("kind"in e)||e.isError||e.call?.name!==ut))try{let o=JSON.parse(e.call.argsRaw);return{callId:e.callId,intent:lr(o)}}catch{return}}function cr(e,o){let t=ld(e);t!==void 0&&o.push(t);for(let n of e.subCalls)cr(n,o)}function ur(e){let o=[];for(let t of e.order){let n=e.nodes.get(t);if(n?.kind!=="tool-call")continue;let a=n.data.root;a!==void 0&&cr(a,o)}return o}var Z=require("react");var pr=require("react");var Y=require("react/jsx-runtime");function pt(e){let o=(0,pr.useId)(),t=ct({nodes:e.nodes,positions:e.state.positions,viewport:e.state.viewport,selectedId:e.state.selectedId,clearSelectionOnEscape:!0,onActivate:e.onOpen,onCommit:r=>{e.onChange({positions:r.positions??e.state.positions,viewport:r.viewport??e.state.viewport,selectedId:r.selectedId===null?void 0:r.selectedId??e.state.selectedId})}}),n=e.nodes.find(r=>r.id===e.state.selectedId),a=20*t.viewport.zoom;return(0,Y.jsxs)("section",{className:"oh-game-canvas-shell","aria-label":e.ariaLabel,children:[(0,Y.jsxs)("div",{className:"oh-game-canvas-toolbar",children:[(0,Y.jsx)("div",{className:"oh-game-canvas-help",id:o,children:e.helpText}),(0,Y.jsxs)("div",{className:"oh-game-canvas-controls",children:[(0,Y.jsx)("button",{type:"button","aria-label":"\u7F29\u5C0F\u753B\u5E03",onClick:t.zoomOut,children:"\u2212"}),(0,Y.jsxs)("span",{"aria-live":"polite",children:[Math.round(t.viewport.zoom*100),"%"]}),(0,Y.jsx)("button",{type:"button","aria-label":"\u653E\u5927\u753B\u5E03",onClick:t.zoomIn,children:"\uFF0B"}),(0,Y.jsx)("button",{type:"button",onClick:t.fitAll,children:"\u9002\u5E94"}),(0,Y.jsx)("button",{type:"button",onClick:t.resetLayout,children:"\u590D\u4F4D"})]})]}),(0,Y.jsxs)("div",{ref:t.viewportRef,className:"oh-game-canvas-viewport",role:"application","aria-roledescription":"\u65E0\u9650\u753B\u5E03","aria-label":`${e.ariaLabel}\u89C6\u91CE`,"aria-describedby":o,tabIndex:0,"data-panning":t.panning||void 0,style:{backgroundPosition:`${String(t.viewport.x)}px ${String(t.viewport.y)}px`,backgroundSize:`${String(a)}px ${String(a)}px`},onPointerDown:t.startPan,onKeyDown:t.onViewportKeyDown,children:[e.nodes.length===0&&(0,Y.jsxs)("div",{className:"oh-game-canvas-empty",children:[(0,Y.jsx)("strong",{children:e.empty.title}),(0,Y.jsx)("span",{children:e.empty.description}),(0,Y.jsx)("button",{type:"button",onClick:e.empty.onAction,children:e.empty.actionLabel})]}),(0,Y.jsxs)("div",{className:"oh-game-canvas-stage",style:{transform:`translate(${String(t.viewport.x)}px, ${String(t.viewport.y)}px) scale(${String(t.viewport.zoom)})`},children:[(0,Y.jsx)("svg",{"aria-hidden":"true",children:e.edges.map(r=>{let s=e.nodes.find(b=>b.id===r.from),i=e.nodes.find(b=>b.id===r.to),g=s===void 0?void 0:t.positions[s.id],m=i===void 0?void 0:t.positions[i.id];if(s===void 0||i===void 0||g===void 0||m===void 0)return null;let c=g.x+s.width,f=g.y+s.height/2,I=m.y+i.height/2,w=Math.max(64,Math.abs(m.x-c)/2),u=r.from===e.state.selectedId||r.to===e.state.selectedId;return(0,Y.jsxs)("g",{children:[(0,Y.jsx)("path",{className:"oh-game-canvas-edge","data-active":u||void 0,d:`M ${String(c)} ${String(f)} C ${String(c+w)} ${String(f)}, ${String(m.x-w)} ${String(I)}, ${String(m.x)} ${String(I)}`}),(0,Y.jsx)("text",{className:"oh-game-canvas-edge-label","data-active":u||void 0,x:(c+m.x)/2,y:(f+I)/2-8,children:r.label})]},`${r.from}:${r.to}`)})}),e.nodes.map(r=>(0,Y.jsxs)("article",{className:"oh-game-canvas-node","data-kind":r.kind,"data-selected":r.id===e.state.selectedId||void 0,"data-dragging":t.draggingId===r.id||void 0,role:"button",tabIndex:0,"aria-pressed":r.id===e.state.selectedId,"aria-label":`${r.eyebrow}\uFF1A${r.title}`,style:{left:t.positions[r.id]?.x??r.initial.x,top:t.positions[r.id]?.y??r.initial.y,width:r.width,height:r.height},onPointerDown:s=>{t.startDrag(s,r.id)},onDoubleClick:()=>{e.onOpen(r)},onKeyDown:s=>{t.onNodeKeyDown(s,r)},children:[(0,Y.jsxs)("header",{children:[(0,Y.jsx)("small",{children:r.eyebrow}),(0,Y.jsx)("span",{"aria-hidden":"true",children:"\u2022\u2022\u2022"})]}),e.renderNodeMedia?.(r),(0,Y.jsxs)("div",{className:"oh-game-canvas-node-copy",children:[(0,Y.jsx)("strong",{children:r.title}),r.excerpt!==void 0&&(0,Y.jsx)("p",{children:r.excerpt})]}),(0,Y.jsx)("footer",{children:e.renderNodeActions(r)})]},r.id))]})]}),n!==void 0&&(0,Y.jsxs)("div",{className:"oh-game-canvas-context","aria-live":"polite",children:[(0,Y.jsxs)("span",{children:[(0,Y.jsx)("small",{children:"\u5DF2\u9009\u4E2D"}),(0,Y.jsx)("strong",{children:n.title})]}),e.renderContextActions(n),(0,Y.jsx)("button",{type:"button",onClick:()=>{e.onContinueInChat(n)},children:"\u5728 Chat \u4E2D\u7EE7\u7EED"})]})]})}var Ze=require("react");var jo=require("react");var ke=require("react/jsx-runtime");function hr({preflight:e}){let o=e.credentials.ttsProvider==="fish-audio"||e.credentials.ttsProvider==="auto"&&!e.credentials.mimo;return(0,ke.jsxs)(ke.Fragment,{children:[(0,ke.jsxs)("span",{"data-ready":e.python.ok||void 0,children:["Python ",e.python.version??"\u672A\u627E\u5230",e.python.ok?"":` \xB7 \u9700\u8981 ${e.python.minimum}+`]}),(0,ke.jsxs)("span",{"data-ready":e.ffmpeg.ok&&e.ffmpeg.subtitles||void 0,children:["ffmpeg ",e.ffmpeg.ok?e.ffmpeg.subtitles?"\xB7 libass":"\xB7 \u7F3A\u5B57\u5E55\u6EE4\u955C":"\u672A\u627E\u5230"]}),(0,ke.jsxs)("span",{"data-ready":e.ffprobe.ok||void 0,children:["ffprobe ",e.ffprobe.ok?"\u53EF\u7528":"\u672A\u627E\u5230"]}),(0,ke.jsxs)("span",{"data-ready":e.credentials.mimo||void 0,children:["MiMo Key ",e.credentials.mimo?"\u5DF2\u914D\u7F6E":"\u672A\u914D\u7F6E"]}),o&&(0,ke.jsxs)("span",{"data-ready":e.credentials.fish||void 0,children:["Fish Key ",e.credentials.fish?"\u5DF2\u914D\u7F6E":"\u672A\u914D\u7F6E"]}),e.credentials.ttsProvider==="index-tts"&&(0,ke.jsxs)("span",{"data-ready":e.credentials.indexTts||void 0,children:["IndexTTS ",e.credentials.indexTts?"\u5DF2\u914D\u7F6E":"\u7F3A INDEX_TTS_ENDPOINT / INDEX_TTS_VOICE"]}),(0,ke.jsxs)("em",{children:["Key \u4E0E PATH \u5728\u542F\u52A8 DSH \u7684\u7EC8\u7AEF\u91CC\u8BBE\u7F6E\uFF0C\u91CD\u542F DSH \u540E\u751F\u6548\u3002\u8FD9\u91CC\u68C0\u67E5 DSH Host \u8FDB\u7A0B\uFF1BAgent \u8FD0\u884C\u73AF\u5883\u4EE5 ",(0,ke.jsx)("code",{children:"scripts/doctor.py"})," \u7684\u7ED3\u679C\u4E3A\u51C6\u3002"]})]})}function mr({sessionId:e}){let[o,t]=(0,jo.useState)(),[n,a]=(0,jo.useState)(0);return(0,jo.useEffect)(()=>{let r=new AbortController;return fetch(he("video-preflight",e),{signal:r.signal}).then(async s=>{if(!s.ok)throw new Error(`HTTP ${String(s.status)}`);let i=await s.json();r.signal.aborted||t(i)}).catch(()=>{r.signal.aborted||t("failed")}),()=>{r.abort()}},[n,e]),(0,ke.jsxs)("div",{className:"oh-video-environment",role:"group","aria-label":"\u89C6\u9891\u8FD0\u884C\u73AF\u5883",children:[(0,ke.jsx)("strong",{children:"\u8FD0\u884C\u73AF\u5883"}),typeof o=="object"?(0,ke.jsx)(hr,{preflight:o}):o==="failed"?(0,ke.jsx)("button",{type:"button",onClick:()=>{t(void 0),a(r=>r+1)},children:"\u73AF\u5883\u68C0\u67E5\u5931\u8D25 \xB7 \u91CD\u8BD5"}):(0,ke.jsx)("em",{children:"\u6B63\u5728\u68C0\u67E5 Python\u3001ffmpeg \u4E0E MiMo Key\u2026"})]})}var me=require("react/jsx-runtime");function gr({project:e,sessionId:o,onClose:t}){let n=(0,Ze.useRef)(null),[a,r]=(0,Ze.useState)(e?.artifacts[0]?.path),s=e?.artifacts.find(f=>f.path===a),[i,g]=(0,Ze.useState)(),[m,c]=(0,Ze.useState)();return(0,Ze.useEffect)(()=>{n.current?.showModal()},[]),(0,Ze.useEffect)(()=>{if(s===void 0)return;let f=new AbortController;return g(void 0),c(void 0),fetch(he("file",o,s.path),{signal:f.signal}).then(async I=>{let w=await I.json();if(!I.ok)throw new Error(w.error??"\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u5236\u4F5C\u8BB0\u5F55");f.signal.aborted||g(w.content)}).catch(I=>{f.signal.aborted||c(I instanceof Error?I.message:String(I))}),()=>{f.abort()}},[s?.path,s?.version,o]),(0,me.jsxs)("dialog",{ref:n,className:"oh-video-details","aria-label":"\u89C6\u9891\u5236\u4F5C\u8BE6\u60C5",onClose:t,children:[(0,me.jsxs)("header",{children:[(0,me.jsx)("h2",{children:"\u5236\u4F5C\u8BE6\u60C5"}),(0,me.jsx)("button",{type:"button",onClick:()=>{n.current?.close()},children:"\u5173\u95ED"})]}),(0,me.jsxs)("details",{children:[(0,me.jsx)("summary",{children:"\u8FD0\u884C\u73AF\u5883"}),(0,me.jsx)(mr,{sessionId:o})]}),e!==void 0&&(0,me.jsxs)(me.Fragment,{children:[(0,me.jsxs)("label",{children:["\u5236\u4F5C\u8BB0\u5F55",(0,me.jsx)("select",{"aria-label":"\u5236\u4F5C\u8BB0\u5F55",value:a??"",onChange:f=>{r(f.target.value)},children:e.artifacts.map(f=>(0,me.jsx)("option",{value:f.path,children:f.label},f.path))})]}),s!==void 0&&(0,me.jsxs)(me.Fragment,{children:[(0,me.jsx)("small",{children:s.path}),m!==void 0?(0,me.jsx)("p",{role:"alert",children:m}):(0,me.jsx)("pre",{children:i??"\u6B63\u5728\u8BFB\u53D6\u5236\u4F5C\u8BB0\u5F55\u2026"})]})]})]})}var br=require("react");function ht(e){let o=Math.max(0,Math.floor(e));return`${String(Math.floor(o/60)).padStart(2,"0")}:${String(o%60).padStart(2,"0")}`}function qe(e){return`${ht(e.start)}\u2013${ht(e.end)}`}function Lo(e){return{"narration.json":"\u89E3\u8BF4\u7A3F","recap_story_plan.json":"\u6545\u4E8B\u4E0E\u8868\u8FBE","agent_narration_brief.md":"\u89E3\u8BF4\u65B9\u5411","visual_audio_board.json":"\u753B\u9762\u4E0E\u58F0\u97F3","subtitles.srt":"\u5B57\u5E55\u7A3F","subtitles.ass":"\u5B57\u5E55\u6837\u5F0F"}[e.path.split("/").at(-1)??""]??e.label}function po(e){let o=["narration.json","recap_story_plan.json","agent_narration_brief.md","visual_audio_board.json","subtitles.srt","subtitles.ass"];return e.artifacts.filter(t=>o.includes(t.path.split("/").at(-1)??"")).sort((t,n)=>o.indexOf(t.path.split("/").at(-1)??"")-o.indexOf(n.path.split("/").at(-1)??""))}function fr(e,o,t){try{let n=JSON.parse(e);if(!Array.isArray(n)||o<0||!Number.isInteger(o))return;let a=n[o];return typeof a!="object"||a===null||Array.isArray(a)||!("narration"in a)||typeof a.narration!="string"?void 0:`${JSON.stringify(n.map((r,s)=>s===o?{...a,narration:t}:r),null,2)}
`}catch{return}}function Go(e,o){if(e.kind!=="narration"||e.index===void 0||o===void 0)return e.text;try{let t=JSON.parse(o),n=Array.isArray(t)?t[e.index]:void 0;if(typeof n=="object"&&n!==null&&"start"in n&&"end"in n&&n.start===e.output.start&&n.end===e.output.end&&"narration"in n&&typeof n.narration=="string")return n.narration}catch{}return e.text}function on(e,o,t){let n=e.previews.find(s=>s.role==="source"),a=o.sourceRanges[0];if(e.narrative?.authoredClock==="unknown"||n===void 0||a===void 0||o.sourceRanges.length!==1)return;if(o.sourceMapping==="identity")return a;if(a.sourcePath!==void 0)return n.path===a.sourcePath||n.path===`${e.root}/${a.sourcePath}`?a:void 0;let r=t.filter(s=>s.kind==="media"&&s.path.startsWith(`${e.root}/sources/`));return a.sourceId===void 0&&r.length===1&&r[0]?.path===n.path?a:void 0}function yr(e,o,t=[]){let n=[],a=po(e).filter(m=>m.kind==="plan"),r=o?.creative;for(let[m,c]of a.entries())n.push({id:`document:${c.path}`,kind:"brief",title:Lo(c),eyebrow:"\u521B\u4F5C\u60F3\u6CD5",path:c.path,excerpt:m===0?[r?.dramaticQuestion,r?.viewerPromise,r?.spine,r?.endingAftertaste].filter(Boolean).join(`
`):void 0,initial:{x:50,y:60+m*230},width:292,height:190});let s=e.previews.find(m=>m.role==="source");s!==void 0&&n.push({id:"source",kind:"source",title:e.title,eyebrow:"\u539F\u7247",path:s.path,initial:{x:50,y:60+a.length*230},width:292,height:282});for(let[m,c]of(o?.segments??[]).entries())n.push({id:`segment:${c.id}`,kind:c.kind==="original"?"world":"concept",title:c.kind==="original"?"\u7559\u7ED9\u539F\u58F0":`\u89E3\u8BF4\u7B2C ${String((c.index??m)+1)} \u6BB5`,eyebrow:`${o?.authoredClock==="unknown"?"\u6587\u7A3F\u65F6\u95F4":"\u8F93\u51FA"} ${qe(c.output)}`,excerpt:c.text??"\u5728\u8FD9\u91CC\u542C\u89C1\u539F\u7247\u7684\u58F0\u97F3\u3002",path:e.narrationPath,segment:c,initial:{x:442+m%3*350,y:60+Math.floor(m/3)*240},width:296,height:200});let i=e.previews.find(m=>m.role==="final")??e.previews.find(m=>m.role==="edited");i!==void 0&&n.push({id:"preview",kind:"preview",title:e.title,eyebrow:i.role==="final"?"\u53EF\u64AD\u653E\u6210\u7247":"\u526A\u540E\u753B\u9762",path:i.path,initial:{x:792,y:80+Math.ceil((o?.segments.length??0)/3)*240},width:316,height:282});let g=s===void 0||o?.authoredClock==="unknown"?[]:n.flatMap(m=>{let c=m.segment===void 0?void 0:on(e,m.segment,t);return c===void 0?[]:[{from:"source",to:m.id,label:`\u539F\u7247 ${qe(c)}`}]});return{nodes:n,edges:g}}var V=require("react/jsx-runtime");function cd(e){try{let o=JSON.parse(e);return Array.isArray(o)?o.slice(0,200).flatMap((t,n)=>typeof t=="object"&&t!==null&&"narration"in t&&typeof t.narration=="string"&&"start"in t&&typeof t.start=="number"&&Number.isFinite(t.start)&&"end"in t&&typeof t.end=="number"&&Number.isFinite(t.end)?[{index:n,narration:t.narration,start:t.start,end:t.end}]:[]):[]}catch{return[]}}var ud={viewer_promise:"\u89C2\u4F17\u4F1A\u770B\u5230\u4EC0\u4E48",dramatic_question:"\u8BA9\u4EBA\u60F3\u770B\u4E0B\u53BB\u7684\u7591\u95EE",pov:"\u4ECE\u8C01\u7684\u89C6\u89D2\u8BB2",narrative_spine:"\u53D9\u4E8B\u4E3B\u7EBF",spine:"\u53D9\u4E8B\u4E3B\u7EBF",emotional_start:"\u5F00\u573A\u60C5\u7EEA",emotional_end:"\u7ED3\u5C3E\u60C5\u7EEA",ending_aftertaste:"\u7559\u4E0B\u7684\u4F59\u5473",director_intent:"\u8868\u8FBE\u610F\u56FE",beats:"\u6545\u4E8B\u6BB5\u843D",title:"\u8FD9\u4E00\u6BB5",description:"\u5185\u5BB9",narration_job:"\u89E3\u8BF4\u8981\u505A\u4EC0\u4E48",audio_owner:"\u8BA9\u8C01\u6765\u8BB2",change:"\u8FD9\u4E00\u6BB5\u7684\u53D8\u5316",what_changes:"\u8FD9\u4E00\u6BB5\u7684\u53D8\u5316",reason:"\u4E3A\u4EC0\u4E48\u4FDD\u7559",visual_choice:"\u753B\u9762\u9009\u62E9",original_anchor:"\u539F\u58F0\u4F9D\u636E"};function pd(e){let o=[],t=(n,a,r)=>{r>5||o.length>=100||(typeof n=="string"&&n.trim()!==""?o.push({label:a,text:n}):Array.isArray(n)?n.slice(0,50).forEach((s,i)=>{t(s,`${a} ${String(i+1)}`,r+1)}):typeof n=="object"&&n!==null&&Object.entries(n).forEach(([s,i])=>{let g=ud[s];g!==void 0&&t(i,g,r+1)}))};try{t(JSON.parse(e),"\u521B\u4F5C\u5185\u5BB9",0)}catch{}return o}function vr({project:e,editor:o,onChat:t}){let n=[...po(e)],a=o.selected;a?.startsWith(`${e.root}/`)===!0&&o.buffers[a]?.missing===!0&&!n.some(u=>u.path===a)&&n.push({path:a,version:o.buffers[a]?.version??"",label:"\u4FDD\u7559\u7684\u672C\u5730\u8349\u7A3F",kind:"script"});let r=n.find(u=>u.path===o.selected)??n[0],s=r?.path;(0,br.useEffect)(()=>{s!==void 0&&s!==o.selected&&o.onSelect(s)},[s,o.selected,o.onSelect]);let i=s===void 0?void 0:o.buffers[s],g=i!==void 0&&i.content!==i.saved,m=o.mode==="source",c=s?.endsWith("/narration.json")===!0,f=i===void 0||!c?[]:cd(i.content),I=r===void 0?"\u521B\u4F5C\u6587\u7A3F":Lo(r),w=i===void 0||c?[]:pd(i.content);return(0,V.jsxs)("div",{className:"oh-video-documents oh-game-documents",children:[(0,V.jsx)("nav",{"aria-label":"\u89C6\u9891\u521B\u4F5C\u6587\u7A3F",children:n.map(u=>(0,V.jsxs)("button",{type:"button","aria-current":u.path===s?"page":void 0,onClick:()=>{o.onSelect(u.path)},children:[(0,V.jsx)("span",{children:Lo(u)}),o.buffers[u.path]?.content!==o.buffers[u.path]?.saved&&(0,V.jsx)("i",{title:"\u5C1A\u672A\u4FDD\u5B58"})]},u.path))}),(0,V.jsxs)("label",{className:"oh-game-doc-picker",children:["\u521B\u4F5C\u6587\u7A3F",(0,V.jsx)("select",{"aria-label":"\u9009\u62E9\u89C6\u9891\u521B\u4F5C\u6587\u7A3F",value:s??"",onChange:u=>{o.onSelect(u.target.value)},children:n.map(u=>(0,V.jsx)("option",{value:u.path,children:Lo(u)},u.path))})]}),(0,V.jsxs)("section",{className:"oh-game-document-body",children:[(0,V.jsxs)("header",{children:[(0,V.jsxs)("div",{children:[(0,V.jsx)("h2",{children:I}),g&&(0,V.jsx)("span",{className:"oh-game-draft-label",children:"\u6539\u7A3F\u8349\u7A3F \xB7 \u5C1A\u672A\u4FDD\u5B58"})]}),(0,V.jsxs)("div",{children:[i!==void 0&&i.missing!==!0&&(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)("button",{type:"button",onClick:()=>{o.onMode(m?"preview":"source")},children:m?"\u9605\u8BFB\u6587\u7A3F":c&&f.length>0?"\u7F16\u8F91\u89E3\u8BF4":"\u7F16\u8F91\u539F\u6587"}),g&&(0,V.jsx)("button",{type:"button",disabled:i.saving===!0,onClick:()=>{s!==void 0&&o.onSave(s)},children:i.saving===!0?"\u6B63\u5728\u4FDD\u5B58\u2026":"\u4FDD\u5B58\u6587\u7A3F"})]}),(0,V.jsx)("button",{type:"button",onClick:()=>{t(`\u6211\u60F3\u7EE7\u7EED\u8BA8\u8BBA\u300A${e.title}\u300B\u7684\u300C${I}\u300D\u3002${s===void 0?"":`\u6587\u7A3F\uFF1A${s}\u3002`}\u8BF7\u5148\u8BA8\u8BBA\u8868\u8FBE\u4E0E\u4FEE\u6539\u601D\u8DEF\u3002`)},children:"Chat"})]})]}),s===void 0?(0,V.jsxs)("div",{className:"oh-game-design-empty",children:[(0,V.jsx)("strong",{children:"\u5148\u60F3\u6E05\u695A\uFF0C\u600E\u4E48\u8BB2"}),(0,V.jsx)("p",{children:"\u4E00\u8D77\u8BA8\u8BBA\u89C2\u4F17\u6700\u60F3\u77E5\u9053\u4EC0\u4E48\u3001\u54EA\u4E9B\u753B\u9762\u548C\u539F\u58F0\u503C\u5F97\u7559\u4E0B\u3002\u5DF2\u6709\u6587\u7A3F\u4F1A\u51FA\u73B0\u5728\u8FD9\u91CC\u3002"}),(0,V.jsx)("button",{type:"button",onClick:()=>{t(`\u6211\u60F3\u8BA8\u8BBA\u300A${e.title}\u300B\u7684\u89E3\u8BF4\u65B9\u5411\uFF0C\u5148\u660E\u786E\u6545\u4E8B\u4E3B\u7EBF\u548C\u60F3\u4FDD\u7559\u7684\u539F\u58F0\u3002`)},children:"\u804A\u804A\u89E3\u8BF4\u65B9\u5411"})]}):i===void 0?(0,V.jsxs)("div",{className:"oh-game-design-empty",role:o.errors[s]===void 0?"status":"alert",children:[o.errors[s]??"\u6B63\u5728\u8BFB\u53D6\u6587\u7A3F\u2026",o.errors[s]!==void 0&&(0,V.jsx)("button",{type:"button",onClick:o.onRetry,children:"\u91CD\u65B0\u8BFB\u53D6"})]}):(0,V.jsxs)(V.Fragment,{children:[i.error!==void 0&&(0,V.jsx)("div",{className:"oh-story-error",role:"alert",children:i.error}),i.conflict!==void 0&&(0,V.jsxs)("div",{className:"oh-story-conflict",role:"alert",children:[(0,V.jsx)("p",{children:i.conflict.message}),i.conflict.theirs!==void 0&&(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)("button",{type:"button",onClick:()=>{o.onConflict(!0)},children:"\u4FDD\u7559\u6211\u7684\u8349\u7A3F"}),(0,V.jsx)("button",{type:"button",onClick:()=>{o.onConflict(!1)},children:"\u4F7F\u7528\u78C1\u76D8\u7248\u672C"})]})]}),i.missing===!0?(0,V.jsxs)("div",{className:"oh-game-design-empty",children:[(0,V.jsx)("p",{children:"\u6587\u7A3F\u5DF2\u79FB\u9664\uFF0C\u4F60\u7684\u8349\u7A3F\u4ECD\u4FDD\u7559\u5728\u5F53\u524D\u4F1A\u8BDD\u3002"}),(0,V.jsx)("textarea",{"aria-label":`${s} \u672C\u5730\u8349\u7A3F`,value:i.content,readOnly:!0}),(0,V.jsx)("button",{type:"button",onClick:()=>{o.onDiscard(s)},children:"\u653E\u5F03\u672C\u5730\u8349\u7A3F"})]}):c&&f.length>0?(0,V.jsx)("div",{className:"oh-video-script-document",children:f.map(u=>(0,V.jsxs)("section",{children:[(0,V.jsxs)("header",{children:[(0,V.jsxs)("strong",{children:["\u7B2C ",u.index+1," \u6BB5"]}),(0,V.jsxs)("span",{children:[e.narrative?.authoredClock==="output"?"\u8F93\u51FA\u65F6\u95F4":e.narrative?.authoredClock==="source"?"\u539F\u7247\u65F6\u95F4":"\u672A\u786E\u8BA4\u65F6\u95F4"," ",qe(u)]})]}),m?(0,V.jsx)("textarea",{"aria-label":`\u7B2C ${String(u.index+1)} \u6BB5\u89E3\u8BF4`,value:u.narration,onChange:b=>{let R=fr(i.content,u.index,b.target.value);R!==void 0&&o.onEdit(s,R)}}):(0,V.jsx)("p",{children:u.narration})]},u.index))}):m?(0,V.jsx)("textarea",{ref:o.textareaRef,"aria-label":s,value:i.content,onChange:u=>{o.onEdit(s,u.target.value)},onBlur:o.onRememberPosition,onSelect:o.onRememberPosition,onScroll:o.onRememberPosition}):s.endsWith(".md")?(0,V.jsx)(bo,{content:i.content,label:s}):w.length>0?(0,V.jsx)("div",{className:"oh-video-readable-plan",children:w.map((u,b)=>(0,V.jsxs)("section",{children:[(0,V.jsx)("h3",{children:u.label}),(0,V.jsx)("p",{children:u.text})]},b))}):s.endsWith(".srt")||s.endsWith(".ass")?(0,V.jsx)("pre",{className:"oh-game-source",children:i.content}):(0,V.jsxs)("div",{className:"oh-game-design-empty",children:[(0,V.jsx)("p",{children:"\u8FD9\u4EFD\u6587\u7A3F\u5C1A\u6CA1\u6709\u53EF\u6574\u7406\u7684\u521B\u4F5C\u6BB5\u843D\uFF0C\u53EF\u4EE5\u67E5\u770B\u539F\u6587\u6216\u5E26\u5230 Chat \u8BA8\u8BBA\u3002"}),(0,V.jsx)("button",{type:"button",onClick:()=>{o.onMode("source")},children:"\u67E5\u770B\u539F\u6587"})]}),(m||g)&&(0,V.jsx)("p",{className:"oh-video-document-note",children:"\u6587\u7A3F\u4FEE\u6539\u540E\u9700\u8981\u7EE7\u7EED\u5236\u4F5C\uFF0C\u5DF2\u6709\u914D\u97F3\u4E0E\u6210\u7247\u4FDD\u7559\u5F53\u524D\u7248\u672C\u3002"}),(0,V.jsxs)("details",{className:"oh-game-document-source",children:[(0,V.jsx)("summary",{children:"\u6587\u7A3F\u6765\u6E90\u4E0E\u539F\u6587"}),(0,V.jsx)("code",{children:s}),(0,V.jsx)("pre",{children:i.content})]})]})]})]})}var _e=["story","drama","game","video"];function Fo(e){if(!Array.isArray(e))return _e;let o=_e.filter(t=>e.includes(t));return o.length>0?o:_e}function tn(e,o){return o.includes(e)?e:o[0]??"story"}function xr(e){return`oh-story.workbench-modes.${e}`}function hd(e,o){if(e===void 0||o===void 0)return _e;try{let t=e.getItem(xr(o));return Fo(t===null?void 0:JSON.parse(t))}catch{return _e}}function md(e,o,t){if(!(e===void 0||o===void 0))try{e.setItem(xr(o),JSON.stringify(Fo(t)))}catch{}}function wr(e){let o=new Map,t=new Map;return{get(n){if(n===void 0)return _e;let a=o.get(n);return a===void 0&&(a=hd(e,n),o.set(n,a)),a},set(n,a){if(n===void 0)return;let r=Fo(a);o.set(n,r),md(e,n,r),t.get(n)?.forEach(s=>{s()})},subscribe(n,a){if(n===void 0)return()=>{};let r=t.get(n);return r===void 0&&(r=new Set,t.set(n,r)),r.add(a),()=>{r.delete(a)}}}}var nn=require("react/jsx-runtime");function ko({className:e,current:o,onSelect:t,modes:n=_e}){return(0,nn.jsx)("div",{className:e,role:"tablist","aria-label":"\u521B\u4F5C\u5DE5\u4F5C\u53F0",children:n.map(a=>(0,nn.jsx)("button",{type:"button",role:"tab","aria-selected":a===o,tabIndex:a===o?0:-1,onKeyDown:r=>{We(r,n,o,t)},onClick:()=>{t(a)},children:fo(a)},a))})}var Co=require("react");var ie=require("react/jsx-runtime");function Po({onClick:e}){return(0,ie.jsx)("button",{className:"oh-workbench-settings-toggle",type:"button","aria-label":"\u5DE5\u4F5C\u53F0\u8BBE\u7F6E","aria-haspopup":"dialog",title:"\u5DE5\u4F5C\u53F0\u8BBE\u7F6E",onClick:e,children:"\u2699"})}function gd({modes:e,onChange:o}){return(0,ie.jsxs)(ie.Fragment,{children:[(0,ie.jsxs)("fieldset",{children:[(0,ie.jsx)("legend",{children:"\u663E\u793A\u7684\u9875\u5361"}),(0,ie.jsx)("p",{children:"\u53EA\u4FDD\u7559\u5E38\u7528\u7684\u5DE5\u4F5C\u53F0\u3002\u9690\u85CF\u4E0D\u5220\u9664\u9879\u76EE\uFF0C\u4E5F\u4E0D\u5F71\u54CD Skills \u6216\u5236\u4F5C\u4EFB\u52A1\u3002"}),(0,ie.jsx)("div",{className:"oh-workbench-settings-options",children:_e.map(t=>(0,ie.jsxs)("label",{children:[(0,ie.jsx)("input",{type:"checkbox",checked:e.includes(t),disabled:e.length===1&&e.includes(t),onChange:n=>{o(Fo(n.target.checked?[...e,t]:e.filter(a=>a!==t)))}}),(0,ie.jsx)("span",{children:fo(t)})]},t))}),(0,ie.jsx)("p",{children:"\u81F3\u5C11\u4FDD\u7559\u4E00\u4E2A\u9875\u5361\u3002\u9009\u62E9\u5728\u5F53\u524D\u6D4F\u89C8\u5668\u4E2D\u6309\u5DE5\u4F5C\u533A\u8BB0\u4F4F\u3002"}),(0,ie.jsx)("button",{type:"button",onClick:()=>{o(_e)},children:"\u663E\u793A\u5168\u90E8"})]}),(0,ie.jsxs)("section",{"aria-label":"\u6A21\u578B\u4E0E API \u914D\u7F6E\u8BF4\u660E",children:[(0,ie.jsx)("h3",{children:"\u6A21\u578B\u4E0E API"}),(0,ie.jsx)("p",{children:"\u5BF9\u8BDD\u6A21\u578B\u4E0E API \u5728 DSH \u8BBE\u7F6E\u4E2D\u7BA1\u7406\u3002"}),(0,ie.jsx)("p",{children:"\u56FE\u7247\u3001\u89C6\u9891\u751F\u6210\u4E0E\u914D\u97F3\u4F7F\u7528\u5404\u5236\u4F5C\u5DE5\u5177\u7684\u4F9B\u5E94\u5546\u914D\u7F6E\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u590D\u7528\u5BF9\u8BDD\u6A21\u578B\u3002\u8BF7\u6309\u300C\u5236\u4F5C\u8BE6\u60C5\u300D\u4E2D\u7684\u63D0\u793A\uFF0C\u5728\u542F\u52A8 DSH \u7684\u73AF\u5883\u91CC\u914D\u7F6E\uFF1BAgent \u4F7F\u7528\u6C99\u7BB1\u6216\u8FDC\u7A0B\u73AF\u5883\u65F6\uFF0C\u9700\u5728\u5BF9\u5E94\u6267\u884C\u73AF\u5883\u914D\u7F6E\u3002"})]})]})}function kr({modes:e,onChange:o,onClose:t}){let n=(0,Co.useRef)(null),a=(0,Co.useId)();return(0,Co.useEffect)(()=>{n.current?.showModal()},[]),(0,ie.jsxs)("dialog",{ref:n,className:"oh-workbench-settings","aria-labelledby":a,onClose:t,children:[(0,ie.jsxs)("header",{children:[(0,ie.jsx)("h2",{id:a,children:"\u5DE5\u4F5C\u53F0\u8BBE\u7F6E"}),(0,ie.jsx)("button",{type:"button","aria-label":"\u5173\u95ED\u5DE5\u4F5C\u53F0\u8BBE\u7F6E",onClick:()=>{n.current?.close()},children:"\xD7"})]}),(0,ie.jsx)(gd,{modes:e,onChange:o})]})}var E=require("react/jsx-runtime");function an(e){return e.previews.find(o=>o.role==="final")??e.previews.find(o=>o.role==="edited")??e.previews.find(o=>o.role==="source")}function rn(e){return{source:"\u539F\u7247",edited:"\u526A\u540E\u753B\u9762",final:"\u6210\u7247"}[e]}function mt(e,o,t=0){return`${he("media",e,o.path)}&version=${encodeURIComponent(o.version)}&reload=${String(t)}`}function fd(e,o){return e?.path===o?.path&&e?.version===o?.version}function Cr({project:e,onChat:o}){return(0,E.jsxs)("div",{className:"oh-video-preview-empty",children:[(0,E.jsx)("span",{"aria-hidden":!0,children:"\u25B7"}),(0,E.jsx)("strong",{children:e===void 0?"\u628A\u8FD9\u6BB5\u6545\u4E8B\uFF0C\u8BB2\u7ED9\u66F4\u591A\u4EBA\u542C":"\u5148\u770B\u770B\u539F\u7247\uFF0C\u60F3\u60F3\u600E\u4E48\u8BB2"}),(0,E.jsx)("p",{children:"\u5728 Chat \u4E2D\u63D0\u4F9B\u60F3\u5904\u7406\u7684\u89C6\u9891\uFF0C\u4E00\u8D77\u8BA8\u8BBA\u4E3B\u7EBF\u3001\u89E3\u8BF4\u548C\u60F3\u4FDD\u7559\u7684\u539F\u58F0\u3002"}),(0,E.jsx)("button",{type:"button",onClick:()=>{o(e===void 0?"\u6211\u60F3\u5236\u4F5C\u4E00\u6BB5\u89C6\u9891\u89E3\u8BF4\uFF0C\u8BF7\u5148\u548C\u6211\u8BA8\u8BBA\u7D20\u6750\u3001\u89C2\u4F17\u548C\u60F3\u8BB2\u7684\u6545\u4E8B\u3002":`\u6211\u60F3\u8BA8\u8BBA\u300A${e.title}\u300B\u600E\u4E48\u8BB2\uFF0C\u5148\u770B\u770B\u5DF2\u6709\u7D20\u6750\u548C\u89E3\u8BF4\u60F3\u6CD5\u3002`)},children:"\u804A\u804A\u89E3\u8BF4\u60F3\u6CD5"})]})}function Pr(e){let o=e.projects.find(i=>i.id===e.projectId)??e.projects[0],[t,n]=(0,Z.useState)(!1),a=(0,Z.useId)();(0,Z.useEffect)(()=>{o!==void 0&&o.id!==e.projectId&&e.onProject(o.id)},[e.onProject,o,e.projectId]);let r=["preview","canvas","docs"],s={preview:"\u9884\u89C8",canvas:"\u521B\u4F5C\u753B\u5E03",docs:"\u6587\u7A3F"};return(0,E.jsxs)("main",{id:e.paneId,className:"oh-video-studio",role:"tabpanel","aria-labelledby":e.labelledBy,hidden:e.hidden,"data-chat-open":e.chatOpen,children:[(0,E.jsxs)("header",{className:"oh-video-toolbar",children:[(0,E.jsxs)("div",{className:"oh-workbench-cluster",children:[(0,E.jsx)(ko,{className:"oh-video-mode-tabs",current:"video",modes:e.workbenchModes,onSelect:e.onWorkbench}),e.onWorkbenchSettings!==void 0&&(0,E.jsx)(Po,{onClick:e.onWorkbenchSettings}),(0,E.jsx)("button",{className:"oh-workbench-collapse",type:"button","aria-label":"\u6536\u8D77\u521B\u4F5C\u5DE5\u4F5C\u53F0",onClick:e.onCollapse,children:"\xD7"})]}),(0,E.jsx)("label",{className:"oh-video-project",children:(0,E.jsx)("select",{"aria-label":"\u89C6\u9891\u9879\u76EE",value:o?.id??"",disabled:o===void 0,onChange:i=>{e.onProject(i.target.value)},children:e.projects.map(i=>(0,E.jsx)("option",{value:i.id,children:i.title},i.id))})}),(0,E.jsx)("div",{className:"oh-video-tabs",role:"tablist","aria-label":"\u89C6\u9891\u5DE5\u4F5C\u53F0",children:r.map(i=>(0,E.jsx)("button",{type:"button",role:"tab",id:`${a}-${i}-tab`,"aria-controls":`${a}-${i}-panel`,"aria-selected":e.tab===i,tabIndex:e.tab===i?0:-1,onKeyDown:g=>{We(g,r,e.tab,e.onTab)},onClick:()=>{e.onTab(i),i==="canvas"&&e.onChatOpen(!1)},children:s[i]},i))}),(0,E.jsxs)("div",{className:"oh-video-workspace-actions",children:[(0,E.jsx)("button",{className:"oh-video-chat-toggle",type:"button","aria-pressed":e.chatOpen,onClick:()=>{e.onChatOpen(!e.chatOpen)},children:"Chat"}),(0,E.jsx)("button",{type:"button",onClick:()=>{n(!0)},children:"\u5236\u4F5C\u8BE6\u60C5"})]})]}),o===void 0?(0,E.jsx)(Cr,{onChat:e.onContinueInChat}):(0,E.jsx)(yd,{...e,project:o,tabsId:a},o.id),t&&(0,E.jsx)(gr,{sessionId:e.sessionId,project:o,onClose:()=>{n(!1)}},o?.id??"empty")]})}function sn(e,o){return{asset:o,narrative:e.narrative,narrationPath:e.narrationPath,narrationVersion:e.narrationVersion}}function yd(e){let{project:o,sessionId:t}=e,n=an(o),[a,r]=(0,Z.useState)(()=>n===void 0?void 0:sn(o,n)),[s,i]=(0,Z.useState)(0),[g,m]=(0,Z.useState)(!1),[c,f]=(0,Z.useState)(!1),[I,w]=(0,Z.useState)(),[u,b]=(0,Z.useState)(0),[R,C]=(0,Z.useState)(!1),[T,O]=(0,Z.useState)(!1),[Q,X]=(0,Z.useState)(),[ge,ee]=(0,Z.useState)(),[ve,q]=(0,Z.useState)(!1),$=(0,Z.useRef)(new Set(o.previews.map(v=>v.role))),W=[...o.previews].reverse().find(v=>!$.current.has(v.role)&&v.role!=="source"),H=(0,Z.useRef)(null),Pe=(0,Z.useRef)({}),K=(0,Z.useRef)(null),N=(0,Z.useRef)(0),j=(0,Z.useRef)(null),z=(0,Z.useRef)(),B=o.previews.find(v=>v.role===a?.asset.role),re=a!==void 0&&B!==void 0&&!fd(a.asset,B),oe=a?.narrative?.segments??[],se=a?.narrative,xe=e.canvasByProject[o.id]??{positions:{}},Oe=o.narrationPath===void 0?void 0:e.editor.buffers[o.narrationPath]?.content,ae=a?.narrationPath===void 0?void 0:e.editor.buffers[a.narrationPath]?.content,Ee=(0,Z.useMemo)(()=>{let v=yr(o,o.narrative,e.files);return{...v,nodes:v.nodes.map(M=>M.segment===void 0?M:{...M,excerpt:Go(M.segment,Oe)})}},[o,Oe,e.files]),Ce=!e.hidden&&e.tab==="preview";(0,Z.useEffect)(()=>{if(!Ce||I===void 0||H.current?.paused!==!1||performance.now()-N.current<4e3)return;let v=K.current,M=Array.from(v?.querySelectorAll("[data-segment-id]")??[]).find(S=>S.dataset.segmentId===I);if(v===null||M===void 0)return;let F=v.getBoundingClientRect(),te=M.getBoundingClientRect();(te.top<F.top||te.bottom>F.bottom)&&v.scrollTo({top:v.scrollTop+te.top-F.top-12,behavior:globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"})},[Ce,I]),(0,Z.useEffect)(()=>{Ce||(H.current?.pause(),C(!1))},[Ce]),(0,Z.useEffect)(()=>{e.chatOpen&&C(!1)},[e.chatOpen]),(0,Z.useEffect)(()=>{if(!R)return;let v=M=>{M.key==="Escape"&&C(!1)};return globalThis.addEventListener("keydown",v),()=>{globalThis.removeEventListener("keydown",v)}},[R]),(0,Z.useEffect)(()=>{a===void 0&&n!==void 0&&r(sn(o,n))},[n,a,o]);let we=(v,M)=>{a!==void 0&&(Pe.current[a.asset.role]=H.current?.currentTime??u),H.current?.pause(),$.current.add(v.role),z.current=M,r(sn(o,v)),m(!1),f(!1),b(0),X(M?.range),ee(void 0),i(F=>F+1)},Re=v=>{let M=H.current;if(M===null||M.readyState===0){z.current=v;return}if(v.time>=M.duration){ee("\u8FD9\u6BB5\u6587\u7A3F\u8D85\u51FA\u5F53\u524D\u89C6\u9891\u8303\u56F4\uFF0C\u53EF\u4EE5\u5148\u6838\u5BF9\u6587\u7A3F\u6216\u8F7D\u5165\u65B0\u7248\u3002");return}M.currentTime=Math.max(0,v.time),X(v.range),ee(void 0)},Ve=v=>{let M=o.previews.find(F=>F.role===v.role);if(M===void 0){ee("\u8FD9\u4EFD\u89C6\u9891\u8FD8\u6CA1\u6709\u51C6\u5907\u597D\uFF0C\u5148\u7EE7\u7EED\u6838\u5BF9\u6587\u7A3F\u3002");return}e.onTab("preview"),C(!1),a?.asset.role===v.role?Re(v):we(M,v)},Ie=v=>se?.authoredClock!=="unknown"&&on(o,v,e.files)!==void 0,Be=v=>{if(v.role===a?.asset.role)return;let M=H.current?.currentTime??0,F=Pe.current[v.role]??0,te=!1;if(v.role!=="source"&&a?.asset.role!=="source")F=M,te=!0;else if(v.role==="source"){let S=oe.find(fe=>M>=fe.output.start&&M<fe.output.end&&Ie(fe)),le=S?.sourceRanges[0];S!==void 0&&le!==void 0&&(F=le.start+(M-S.output.start)*(le.end-le.start)/(S.output.end-S.output.start),te=!0)}else{let S=oe.find(fe=>Ie(fe)&&fe.sourceRanges.some(ne=>M>=ne.start&&M<ne.end)),le=S?.sourceRanges[0];S!==void 0&&le!==void 0&&(F=S.output.start+(M-le.start)*(S.output.end-S.output.start)/(le.end-le.start),te=!0)}we(v,{role:v.role,time:F}),te||ee(F>0?"\u5F53\u524D\u7247\u6BB5\u6CA1\u6709\u53EF\u9760\u5BF9\u5E94\uFF0C\u5DF2\u56DE\u5230\u8FD9\u4EFD\u89C6\u9891\u4E0A\u6B21\u7684\u4F4D\u7F6E\u3002":"\u5F53\u524D\u7247\u6BB5\u6CA1\u6709\u53EF\u9760\u5BF9\u5E94\uFF0C\u53EF\u4EE5\u4ECE\u8FD9\u4EFD\u89C6\u9891\u5F00\u5934\u6838\u5BF9\u3002")},co=v=>se?.authoredClock!=="unknown"&&se!==void 0&&(o.previews.some(M=>M.role!=="source")||Ie(v)),Xe=(v,M=!1)=>{if(w(v.id),M){let S=v.sourceRanges[0];S!==void 0&&Ie(v)&&Ve({role:"source",time:S.start,range:S});return}let F=a?.asset.role==="edited"?"edited":o.previews.some(S=>S.role==="final")?"final":o.previews.some(S=>S.role==="edited")?"edited":"source",te=F==="source"?v.sourceRanges[0]:v.output;te!==void 0&&co(v)&&Ve({role:F,time:te.start})},je=v=>{let M=v??o.narrationPath??po(o)[0]?.path;M!==void 0&&e.editor.onSelect(M),e.editor.onMode("preview"),e.onTab("docs")},P=v=>{H.current?.pause();let M=a?.asset.role,F=v===void 0?`\u5F53\u524D${M===void 0?"\u9884\u89C8":rn(M)} ${ht(u)}`:`${v.kind==="original"?"\u539F\u58F0":"\u89E3\u8BF4\u6BB5\u843D"}\uFF0C\u8F93\u51FA ${qe(v.output)}${v.sourceRanges.length===0?"":`\uFF1B\u539F\u7247 ${v.sourceRanges.map(qe).join("\u3001")}`}
\u6587\u7A3F\uFF1A${Go(v,ae)??"\u4FDD\u7559\u539F\u7247\u58F0\u97F3"}`;e.onContinueInChat(`\u6211\u60F3\u8C03\u6574\u300A${o.title}\u300B\u7684${F}\u3002
${a===void 0?"":`\u6B63\u5728\u9884\u89C8\uFF1A${a.asset.path}\uFF0C\u7248\u672C ${a.asset.version}\u3002
`}\u8BF7\u5148\u8BA8\u8BBA\u753B\u9762\u3001\u89E3\u8BF4\u4E0E\u58F0\u97F3\u7684\u4FEE\u6539\u601D\u8DEF\u3002`)},Ne=v=>{if(v.segment!==void 0){if(o.narrative?.authoredClock==="unknown"){je();return}if(e.onTab("preview"),re||o.narrationVersion!==a?.narrationVersion&&!oe.some(F=>F.id===v.segment?.id&&F.output.start===v.segment.output.start&&F.output.end===v.segment.output.end)){ee("\u6587\u7A3F\u6216\u89C6\u9891\u5DF2\u6709\u66F4\u65B0\u3002\u5148\u8F7D\u5165\u65B0\u7248\u672C\uFF0C\u518D\u6838\u5BF9\u8FD9\u6BB5\u5185\u5BB9\uFF1B\u5F53\u524D\u64AD\u653E\u4FDD\u6301\u539F\u6837\u3002");return}let M=oe.find(F=>F.id===v.segment?.id);M!==void 0?Xe(M,a?.asset.role==="source"&&Ie(M)):ee("\u5148\u5728\u6587\u7A3F\u91CC\u6838\u5BF9\u8FD9\u6BB5\u7684\u65F6\u95F4\uFF0C\u518D\u7EE7\u7EED\u5B9A\u4F4D\u3002")}else if(v.id==="source")Ve({role:"source",time:0});else if(v.id==="preview"){let M=an(o);M!==void 0&&M.role!==a?.asset.role?Ve({role:M.role,time:Pe.current[M.role]??0}):e.onTab("preview")}else je(v.path)},Ue=async()=>{let v=o.artifacts.find(M=>M.path.endsWith("/subtitles.srt"));if(v!==void 0){q(!0);try{let M=await fetch(he("file",t,v.path)),F=await M.json();if(!M.ok||F.content===void 0)throw new Error(F.error??"\u5B57\u5E55\u6682\u65F6\u65E0\u6CD5\u5BFC\u51FA");let te=URL.createObjectURL(new Blob([F.content],{type:"application/x-subrip;charset=utf-8"})),S=document.createElement("a");S.href=te,S.download=`${o.title}.srt`,S.click(),globalThis.setTimeout(()=>{URL.revokeObjectURL(te)},1e3)}catch(M){ee(M instanceof Error?M.message:String(M))}finally{q(!1)}}},De=(v,M)=>(0,E.jsxs)("article",{className:"oh-video-script-segment","data-segment-id":v.id,"data-selected":I===v.id,"data-kind":v.kind,children:[(0,E.jsxs)("button",{className:"oh-video-segment-jump",type:"button",disabled:!co(v),onClick:()=>{Xe(v)},children:[(0,E.jsxs)("span",{children:[v.kind==="original"?"\u4FDD\u7559\u539F\u58F0":`\u89E3\u8BF4 ${String((v.index??M)+1).padStart(2,"0")}`,(0,E.jsxs)("small",{children:[se?.authoredClock==="unknown"?"\u6587\u7A3F\u65F6\u95F4":"\u8F93\u51FA"," ",qe(v.output)]})]}),(0,E.jsxs)("p",{children:[Go(v,ae)??"\u542C\u4E00\u542C\u539F\u7247\u91CC\u503C\u5F97\u7559\u4E0B\u7684\u58F0\u97F3\u3002",Go(v,ae)!==v.text&&(0,E.jsx)("small",{className:"oh-video-draft-wording",children:"\u6539\u7A3F\u6587\u6848 \xB7 \u914D\u97F3\u672A\u66F4\u65B0"})]})]}),(0,E.jsxs)("footer",{children:[Ie(v)?(0,E.jsxs)("button",{type:"button",onClick:()=>{Xe(v,!0)},children:["\u539F\u7247 ",qe(v.sourceRanges[0])]}):(0,E.jsx)("span",{children:v.sourceRanges.length>1?"\u5BF9\u5E94\u591A\u6BB5\u539F\u7247":"\u539F\u7247\u5BF9\u5E94\u5F85\u6838\u5BF9"}),(0,E.jsxs)("div",{children:[v.kind==="narration"&&(0,E.jsx)("button",{type:"button",onClick:()=>{je(a?.narrationPath),e.editor.onMode("source")},children:"\u6539\u7A3F"}),(0,E.jsx)("button",{type:"button","aria-label":`\u8BA8\u8BBA\u7B2C ${String(M+1)} \u6BB5`,onClick:()=>{P(v)},children:"Chat"})]})]})]},v.id);return(0,E.jsxs)("div",{className:"oh-video-panels",children:[(0,E.jsx)("section",{role:"tabpanel",id:`${e.tabsId}-preview-panel`,"aria-labelledby":`${e.tabsId}-preview-tab`,hidden:e.tab!=="preview",children:(0,E.jsxs)("div",{className:"oh-video-preview-layout","data-script-open":R,"data-script-collapsed":T||a===void 0,children:[(0,E.jsxs)("div",{className:"oh-video-preview-main",children:[a===void 0?(0,E.jsx)(Cr,{project:o,onChat:e.onContinueInChat}):(0,E.jsxs)("div",{ref:j,className:"oh-video-preview-shell","data-state":c?"error":e.running?"building":g?"ready":"loading",children:[(0,E.jsxs)("div",{className:"oh-video-stagebar",children:[(0,E.jsx)("div",{className:"oh-video-version-tabs",role:"tablist","aria-label":"\u9884\u89C8\u7248\u672C",children:o.previews.map(v=>(0,E.jsx)("button",{type:"button",role:"tab","aria-selected":v.role===a.asset.role,tabIndex:v.role===a.asset.role?0:-1,onClick:()=>{Be(v)},onKeyDown:M=>{We(M,o.previews.map(F=>F.role),a.asset.role,F=>{let te=o.previews.find(S=>S.role===F);te!==void 0&&Be(te)})},children:rn(v.role)},v.role))}),(0,E.jsxs)("div",{className:"oh-video-preview-actions",children:[(0,E.jsx)("button",{className:"oh-video-context-action",type:"button","aria-expanded":R||!e.chatOpen&&!T&&(j.current?.closest(".oh-video-studio")?.clientWidth??0)>800,onClick:()=>{e.chatOpen||(j.current?.closest(".oh-video-studio")?.clientWidth??0)<=800?C(v=>!v):O(v=>!v)},children:"\u89E3\u8BF4\u7A3F"}),(0,E.jsx)("button",{className:"oh-video-context-action",type:"button",onClick:()=>{P()},children:"\u8BA8\u8BBA\u5F53\u524D\u753B\u9762"}),(0,E.jsx)("a",{href:mt(t,a.asset,s),download:`${o.title}-${rn(a.asset.role)}.${a.asset.path.split(".").at(-1)??"mp4"}`,children:"\u5BFC\u51FA\u89C6\u9891"}),(0,E.jsx)("button",{type:"button","aria-label":"\u5168\u5C4F\u9884\u89C8",onClick:()=>{j.current?.requestFullscreen().catch(()=>{ee("\u5F53\u524D\u73AF\u5883\u6682\u4E0D\u652F\u6301\u5168\u5C4F\uFF0C\u53EF\u4EE5\u5728\u65B0\u7A97\u53E3\u6253\u5F00\u89C6\u9891\u3002")})},children:"\u26F6"})]})]}),(0,E.jsxs)("div",{className:"oh-video-player-stage",children:[(0,E.jsx)("video",{ref:H,src:mt(t,a.asset,s),controls:!0,preload:"metadata",playsInline:!0,onLoadedMetadata:()=>{m(!0),f(!1);let v=z.current;z.current=void 0,v!==void 0&&Re(v)},onError:()=>{f(!0),m(!1)},onTimeUpdate:()=>{let v=H.current;if(v!==null)if(b(v.currentTime),Q!==void 0&&v.currentTime>=Q.end&&(v.pause(),X(void 0)),a.asset.role!=="source"){let M=oe.find(F=>v.currentTime>=F.output.start&&v.currentTime<F.output.end);M!==void 0&&w(M.id)}else{let M=oe.filter(F=>Ie(F)&&F.sourceRanges.some(te=>v.currentTime>=te.start&&v.currentTime<te.end));M.length===1&&w(M[0]?.id)}}},`${a.asset.path}:${a.asset.version}:${String(s)}`),c&&(0,E.jsxs)("div",{className:"oh-video-media-error",role:"alert",children:[(0,E.jsx)("strong",{children:"\u6682\u65F6\u65E0\u6CD5\u64AD\u653E\u8FD9\u6BB5\u89C6\u9891"}),(0,E.jsx)("button",{type:"button",onClick:()=>{we(a.asset)},children:"\u91CD\u65B0\u8BFB\u53D6\u89C6\u9891"}),(0,E.jsx)("a",{href:mt(t,a.asset,s),target:"_blank",rel:"noreferrer",children:"\u5728\u65B0\u7A97\u53E3\u6253\u5F00"})]})]}),(0,E.jsx)("div",{role:"status",children:(e.running||Q!==void 0)&&(0,E.jsxs)("div",{className:"oh-video-player-caption",children:[(0,E.jsx)("span",{children:Q===void 0?"":`\u6838\u5BF9 ${qe(Q)}`}),(0,E.jsx)("span",{children:e.running?"\u6B63\u5728\u7EE7\u7EED\u5236\u4F5C \xB7 \u5F53\u524D\u89C6\u9891\u4FDD\u7559":""})]})})]}),a!==void 0&&B===void 0&&(0,E.jsx)("p",{className:"oh-video-notice",role:"status",children:"\u5F53\u524D\u89C6\u9891\u5DF2\u4ECE\u9879\u76EE\u79FB\u9664\uFF0C\u5DF2\u6253\u5F00\u7684\u753B\u9762\u4FDD\u7559\uFF1B\u53EF\u4EE5\u9009\u62E9\u5176\u4ED6\u89C6\u9891\u7EE7\u7EED\u6838\u5BF9\u3002"}),(re||W!==void 0)&&(0,E.jsxs)("div",{className:"oh-video-version-notice",role:"status",children:[(0,E.jsxs)("div",{children:[(0,E.jsx)("strong",{children:"\u65B0\u7248\u672C\u5DF2\u51C6\u5907\u597D"}),(0,E.jsx)("span",{children:"\u5F53\u524D\u89C6\u9891\u4FDD\u7559\uFF0C\u51C6\u5907\u597D\u540E\u518D\u8F7D\u5165\u3002"})]}),(0,E.jsx)("button",{type:"button",onClick:()=>{let v=re?B:W;v!==void 0&&we(v)},children:"\u8F7D\u5165\u65B0\u7248\u672C"})]}),ge!==void 0&&(0,E.jsx)("p",{className:"oh-video-notice",role:"status",children:ge})]}),a!==void 0&&(0,E.jsxs)("aside",{className:"oh-video-script-panel","aria-label":"\u5206\u6BB5\u89E3\u8BF4\u7A3F",children:[(0,E.jsxs)("header",{children:[(0,E.jsxs)("h3",{children:["\u89E3\u8BF4\u7A3F ",(0,E.jsx)("small",{children:oe.length>0?`${String(oe.length)} \u6BB5`:""})]}),(0,E.jsx)("button",{type:"button","aria-label":"\u6536\u8D77\u89E3\u8BF4\u7A3F",onClick:()=>{C(!1),O(!0)},children:"\xD7"})]}),(0,E.jsx)("div",{ref:K,className:"oh-video-segment-list",onWheel:()=>{N.current=performance.now()},onTouchMove:()=>{N.current=performance.now()},children:oe.length>0?oe.map(De):(0,E.jsx)("div",{className:"oh-video-script-empty",children:(0,E.jsx)("button",{type:"button",onClick:()=>{e.onContinueInChat(`\u6211\u60F3\u8BA8\u8BBA\u300A${o.title}\u300B\u7684\u89E3\u8BF4\u65B9\u5411\uFF0C\u8BF7\u5148\u68B3\u7406\u4E3B\u7EBF\u548C\u539F\u58F0\u3002`)},children:"\u804A\u804A\u89E3\u8BF4\u65B9\u5411"})})})]})]})}),(0,E.jsx)("section",{role:"tabpanel",id:`${e.tabsId}-canvas-panel`,"aria-labelledby":`${e.tabsId}-canvas-tab`,hidden:e.tab!=="canvas",children:(0,E.jsx)(pt,{nodes:Ee.nodes,edges:Ee.edges,state:xe,onChange:v=>{e.onCanvasChange(o.id,v)},ariaLabel:"\u89C6\u9891\u521B\u4F5C\u65E0\u9650\u753B\u5E03",helpText:"\u62D6\u52A8\u7A7A\u767D\u5904\u5E73\u79FB \xB7 \u6EDA\u8F6E\u7F29\u653E \xB7 \u53CC\u51FB\u6253\u5F00\u5185\u5BB9",empty:{title:"\u5148\u4ECE\u60F3\u8BB2\u7684\u6545\u4E8B\u5F00\u59CB",description:"\u548C AI \u8BA8\u8BBA\u4E3B\u7EBF\uFF0C\u5DF2\u6709\u6587\u7A3F\u548C\u5A92\u4F53\u4F1A\u51FA\u73B0\u5728\u8FD9\u91CC\u3002",actionLabel:"\u804A\u804A\u89E3\u8BF4\u60F3\u6CD5",onAction:()=>{e.onContinueInChat(`\u6211\u60F3\u8BA8\u8BBA\u300A${o.title}\u300B\u7684\u6545\u4E8B\u4E3B\u7EBF\u548C\u89E3\u8BF4\u65B9\u5411\u3002`)}},onOpen:Ne,onContinueInChat:v=>{v.segment!==void 0?P(v.segment):e.onContinueInChat(`\u6211\u60F3\u7EE7\u7EED\u8C03\u6574\u300A${o.title}\u300B\u7684\u300C${v.title}\u300D\u3002${v.path===void 0?"":`\u5185\u5BB9\uFF1A${v.path}\u3002`}\u8BF7\u5148\u8BA8\u8BBA\u601D\u8DEF\u3002`)},renderNodeMedia:v=>{let M=v.id==="source"?o.previews.find(F=>F.role==="source"):v.id==="preview"?an(o):void 0;return M===void 0||e.tab!=="canvas"?null:(0,E.jsx)("video",{className:"oh-video-canvas-thumbnail",src:mt(t,M),preload:"metadata",muted:!0,playsInline:!0,tabIndex:-1,"aria-hidden":!0})},renderNodeActions:v=>(0,E.jsx)("button",{type:"button",onClick:()=>{Ne(v)},children:v.segment!==void 0?o.narrative?.authoredClock==="unknown"?"\u6253\u5F00\u6587\u7A3F":"\u5B9A\u4F4D\u8FD9\u6BB5":v.id==="source"?"\u770B\u539F\u7247":v.id==="preview"?"\u56DE\u5230\u9884\u89C8":"\u6253\u5F00\u6587\u7A3F"}),renderContextActions:v=>(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)("button",{type:"button",onClick:()=>{Ne(v)},children:v.segment===void 0?"\u6253\u5F00\u5185\u5BB9":"\u5B9A\u4F4D\u8FD9\u6BB5"}),v.segment!==void 0&&(0,E.jsx)("button",{type:"button",onClick:()=>{je()},children:"\u6253\u5F00\u6587\u7A3F"})]})})}),(0,E.jsxs)("section",{role:"tabpanel",id:`${e.tabsId}-docs-panel`,"aria-labelledby":`${e.tabsId}-docs-tab`,hidden:e.tab!=="docs",children:[!e.hidden&&e.tab==="docs"&&(0,E.jsx)(vr,{project:o,editor:e.editor,onChat:e.onContinueInChat}),(0,E.jsx)("div",{className:"oh-video-document-export",children:o.artifacts.some(v=>v.path.endsWith("/subtitles.srt"))&&(0,E.jsx)("button",{type:"button",disabled:ve,onClick:()=>{Ue()},children:ve?"\u6B63\u5728\u5BFC\u51FA\u2026":"\u5BFC\u51FA\u9879\u76EE\u5B57\u5E55"})})]})]})}function Sr(e){return e===void 0?!1:e.files.length>0||e.videos.length>0||e.games.length>0}function Ir(e,o){return e===void 0?o:e==="open"}function Nr(e){return`oh-story.workbench.${e}`}function dn(e,o){if(e===void 0||o===void 0)return;let t;try{t=e.getItem(Nr(o))}catch{return}return t==="open"||t==="closed"?t:void 0}function Tr(e,o,t){if(!(e===void 0||o===void 0))try{e.setItem(Nr(o),t)}catch{}}function So(){try{return globalThis.localStorage}catch{return}}var Er="oh-story.welcome-guide";function Rr(e){if(e===void 0)return;let o;try{o=e.getItem(Er)}catch{return}return o==="open"||o==="closed"?o:void 0}function Dr(e,o){if(e!==void 0)try{e.setItem(Er,o?"open":"closed")}catch{}}function Ho(e){return e.optimisticValue!==void 0?e.optimisticValue:e.formStatus==="loading"?!1:e.formStatus==="ready"&&e.writable?e.hostValue!==!1:e.hostValue===!1||e.workspaceWelcomeGuide===!1?!1:e.localPreference!==void 0?e.localPreference==="open":!(e.hostValue===void 0&&e.workspaceWelcomeGuide===void 0)}var gt=require("react");var J=require("react/jsx-runtime");async function bd(){let e=await fetch("/oh-story/config");if(!e.ok)throw new Error(`HTTP ${String(e.status)}`);return(await e.json()).welcomeGuide!==!1}var qo=class{constructor(o=So){this.getStorage=o;this.snapshot={formStatus:"absent",hostValue:void 0,writable:!1,fallbackHostValue:void 0,optimisticValue:void 0,localPreference:Rr(this.getStorage()),saving:!1,error:void 0}}getStorage;listeners=new Set;form;fallbackProbe;snapshot;getSnapshot=()=>this.snapshot;subscribe=o=>(this.listeners.add(o),()=>{this.listeners.delete(o)});update(o){this.snapshot={...this.snapshot,...o};for(let t of[...this.listeners])t()}connectForm(o){this.form=o;let t=()=>{let a=o.getSnapshot();this.update({formStatus:a.status,hostValue:a.value?.welcomeGuide,writable:a.writable})};t();let n=o.subscribe(t);return()=>{n(),this.form===o&&(this.form=void 0,this.update({formStatus:"absent",hostValue:void 0,writable:!1}))}}ensureFallbackHostConfig(o=bd){let{formStatus:t,hostValue:n,fallbackHostValue:a}=this.snapshot;t!=="absent"&&t!=="unavailable"||n!==void 0||a!==void 0||this.fallbackProbe===void 0&&(this.fallbackProbe=o().then(r=>{this.update({fallbackHostValue:r})}).catch(()=>{}).finally(()=>{this.fallbackProbe=void 0}))}async setEnabled(o){let t=this.snapshot,n=this.form;if(n!==void 0&&t.formStatus==="ready"&&t.writable){this.update({optimisticValue:o,saving:!0,error:void 0});try{let r=await n.set("welcomeGuide",o),s=n.getSnapshot();return this.update({formStatus:s.status,hostValue:s.value?.welcomeGuide,writable:s.writable,optimisticValue:void 0,saving:!1,error:r?void 0:"\u672A\u80FD\u4FDD\u5B58\u6B22\u8FCE\u5F15\u5BFC\u8BBE\u7F6E\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"}),r}catch(r){let s=n.getSnapshot();return this.update({formStatus:s.status,hostValue:s.value?.welcomeGuide,writable:s.writable,optimisticValue:void 0,saving:!1,error:r instanceof Error?r.message:"\u672A\u80FD\u4FDD\u5B58\u6B22\u8FCE\u5F15\u5BFC\u8BBE\u7F6E\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"}),!1}}if(t.hostValue===!1||t.fallbackHostValue===!1)return this.update({error:"\u5F53\u524D\u5BBF\u4E3B\u914D\u7F6E\u5DF2\u56FA\u5B9A\u5173\u95ED\u6B22\u8FCE\u5F15\u5BFC\u3002"}),!1;let a=o?"open":"closed";return Dr(this.getStorage(),o),this.update({localPreference:a,optimisticValue:void 0,error:void 0}),!0}};function ln({styles:e,onDismiss:o,dismissing:t=!1}={}){return(0,J.jsxs)("section",{className:"oh-story-welcome","aria-label":"Oh Story \u4F7F\u7528\u5F15\u5BFC",children:[e!==void 0&&(0,J.jsx)("style",{children:e}),(0,J.jsxs)("div",{className:"oh-story-welcome-header",children:[(0,J.jsx)("h2",{children:"Oh Story \u521B\u4F5C\u5DE5\u4F5C\u53F0"}),o!==void 0&&(0,J.jsx)("button",{type:"button",className:"oh-story-welcome-dismiss",disabled:t,onClick:o,children:"\u5173\u95ED\u6B22\u8FCE\u5F15\u5BFC"})]}),(0,J.jsxs)("p",{children:["\u6253\u5F00\u5DF2\u6709\u4F5C\u54C1\u76EE\u5F55\u65F6\uFF0C\u5C0F\u8BF4\u3001\u77ED\u5267\u3001\u6E38\u620F\u3001\u89C6\u9891\u5DE5\u4F5C\u53F0\u4F1A\u81EA\u52A8\u5C55\u5F00\u3002\u8981\u4ECE\u7A7A\u767D\u4F1A\u8BDD\u65B0\u5EFA\u4F5C\u54C1\uFF0C\u8BF7\u786E\u8BA4\u5F53\u524D\u4F1A\u8BDD\u6A21\u5F0F\u652F\u6301\u52A0\u8F7D\u6280\u80FD\uFF08\u5982\u9ED8\u8BA4\u7684 ",(0,J.jsx)("code",{children:"Standard"})," \u6216 ",(0,J.jsx)("code",{children:"PTC"}),"\uFF1B",(0,J.jsx)("code",{children:"Minimal"})," \u6A21\u5F0F\u4E0D\u52A0\u8F7D\u63D2\u4EF6\u6280\u80FD\uFF09\uFF0C\u518D\u8F93\u5165 ",(0,J.jsx)("code",{children:"/story"}),"\u3001",(0,J.jsx)("code",{children:"/short-drama"}),"\u3001",(0,J.jsx)("code",{children:"/novel-to-game quick"}),"\u3001",(0,J.jsx)("code",{children:"/video-recap"})," \u6216\u76F4\u63A5\u8BF4\u8BF4\u60F3\u5199\u4EC0\u4E48\u3002"]}),(0,J.jsxs)("ol",{children:[(0,J.jsx)("li",{children:"\u4E0D\u9009\u6587\u4EF6\u5939\u4E5F\u80FD\u5F00\u59CB\uFF1A\u4F5C\u54C1\u4F1A\u5199\u8FDB DSH \u81EA\u52A8\u5EFA\u7ACB\u7684\u300C\u9ED8\u8BA4\u5DE5\u4F5C\u533A / Default workspace\u300D\u3002"}),(0,J.jsx)("li",{children:"\u60F3\u653E\u8FDB\u81EA\u5DF1\u7684\u4F5C\u54C1\u6587\u4EF6\u5939\uFF1A\u70B9\u51FB\u5DE6\u4FA7\u300C\u5DE5\u4F5C\u533A / Workspaces\u300D\u65C1\u7684\u300C\u6DFB\u52A0\u5DE5\u4F5C\u533A / Add workspace\u300D\uFF0C\u5728\u7CFB\u7EDF\u5F39\u51FA\u7684\u6587\u4EF6\u5939\u7A97\u53E3\u91CC\u9009\u62E9\uFF0C\u518D\u5728\u4E0B\u65B9\u300C\u9009\u62E9\u5DE5\u4F5C\u533A / Choose workspace\u300D\u4E2D\u9009\u4E2D\u5B83\u3002"}),(0,J.jsx)("li",{children:"\u8F93\u5165\u6846\u53F3\u4E0B\u89D2\u663E\u793A\u6A21\u578B\u540D\u5C31\u8BF4\u660E\u5DF2\u914D\u7F6E\u597D\uFF1B\u6CA1\u6709\u6A21\u578B\u65F6\uFF0C\u5728\u300C\u8BBE\u7F6E \u2192 \u6A21\u578B\u300D\u586B\u5165 API Key\u3002\u53EA\u67E5\u770B\u5DF2\u6709\u4F5C\u54C1\u65E0\u9700 API Key\u3002"})]}),(0,J.jsxs)("p",{className:"oh-story-welcome-note",children:["\u4E0D\u9700\u8981\u7A7A\u767D\u4F1A\u8BDD\u63D0\u793A\u65F6\u53EF\u70B9\u51FB\u53F3\u4E0A\u89D2\u300C\u5173\u95ED\u6B22\u8FCE\u5F15\u5BFC\u300D\uFF0C\u4E4B\u540E\u53EF\u5728\u5DE6\u4FA7\u300C\u63D2\u4EF6 \u2192 @winterhuan/oh-story-dsh\u300D\u6216\u914D\u7F6E\u9879 ",(0,J.jsx)("code",{children:"welcomeGuide"})," \u91CD\u65B0\u5F00\u542F\u3002"]})]})}function $r({view:e="page",controller:o,styles:t}){let n=(0,gt.useSyncExternalStore)(o.subscribe,o.getSnapshot,o.getSnapshot);(0,gt.useEffect)(()=>{o.ensureFallbackHostConfig()},[o]);let a=Ho({formStatus:n.formStatus,hostValue:n.hostValue,writable:n.writable,optimisticValue:n.optimisticValue,localPreference:n.localPreference,workspaceWelcomeGuide:n.fallbackHostValue});if(e==="summary")return(0,J.jsx)("span",{children:a?"\u7A7A\u767D\u4F1A\u8BDD\u6B22\u8FCE\u5F15\u5BFC\uFF1A\u5DF2\u5F00\u542F":"\u7A7A\u767D\u4F1A\u8BDD\u6B22\u8FCE\u5F15\u5BFC\uFF1A\u5DF2\u5173\u95ED"});let r=!n.writable&&(n.hostValue===!1||n.fallbackHostValue===!1),s=n.saving||n.formStatus==="loading"||r;return(0,J.jsxs)("div",{className:"oh-story-plugin-config",children:[t!==void 0&&(0,J.jsx)("style",{children:t}),(0,J.jsxs)("div",{className:"oh-story-plugin-config-row",children:[(0,J.jsxs)("div",{className:"oh-story-plugin-config-copy",children:[(0,J.jsx)("strong",{children:"\u7A7A\u767D\u4F1A\u8BDD\u6B22\u8FCE\u5F15\u5BFC"}),(0,J.jsx)("span",{children:r?(0,J.jsxs)(J.Fragment,{children:["\u5F53\u524D\u5BBF\u4E3B\u914D\u7F6E\u5DF2\u56FA\u5B9A\u5173\u95ED\u6B22\u8FCE\u5F15\u5BFC\uFF08",(0,J.jsx)("code",{children:"welcomeGuide: false"}),"\uFF09\u3002"]}):"\u5728\u8FD8\u6CA1\u6709\u4F5C\u54C1\u6587\u4EF6\u7684\u7A7A\u767D\u4F1A\u8BDD\u91CC\u663E\u793A\u5165\u95E8\u5F15\u5BFC\u3002\u5173\u95ED\u540E\u7A7A\u767D\u4F1A\u8BDD\u4E0D\u518D\u663E\u793A\u5F15\u5BFC\u5361\uFF0C\u5DF2\u6709\u4F5C\u54C1\u76EE\u5F55\u4ECD\u7167\u5E38\u6253\u5F00\u521B\u4F5C\u5DE5\u4F5C\u53F0\u3002"})]}),(0,J.jsx)("button",{type:"button",role:"switch",className:"oh-story-plugin-switch","aria-label":"\u7A7A\u767D\u4F1A\u8BDD\u6B22\u8FCE\u5F15\u5BFC","aria-checked":a,disabled:s,onClick:()=>{o.setEnabled(!a)},children:(0,J.jsx)("i",{"aria-hidden":!0})})]}),n.error!==void 0&&(0,J.jsx)("p",{className:"oh-story-plugin-config-error",role:"alert",children:n.error})]})}var hn=require("react");var ft=[{relativePath:"PRODUCT_BRIEF.md",title:"\u6211\u4EEC\u60F3\u505A\u7684\u6E38\u620F",kind:"brief",eyebrow:"\u521B\u4F5C\u65B9\u5411",initial:{x:80,y:96}},{relativePath:"analysis/SOURCE_BIBLE.md",title:"\u539F\u8457\u4E0E\u6545\u4E8B\u4F9D\u636E",kind:"source",eyebrow:"\u6545\u4E8B\u6765\u6E90",initial:{x:80,y:342}},{relativePath:"concepts/CONCEPT.md",title:"\u73A9\u5BB6\u4E3A\u4EC0\u4E48\u60F3\u7EE7\u7EED",kind:"concept",eyebrow:"\u6838\u5FC3\u6784\u60F3",initial:{x:80,y:588}},{relativePath:"design/GAME_DESIGN.md",title:"\u9009\u62E9\u4E0E\u73A9\u6CD5",kind:"design",eyebrow:"\u6E38\u620F\u8BBE\u8BA1",initial:{x:472,y:342}},{relativePath:"design/ART_DIRECTION.md",title:"\u753B\u9762\u4E0E\u6C1B\u56F4",kind:"art",eyebrow:"\u89C6\u89C9\u8868\u8FBE",initial:{x:864,y:96}},{relativePath:"build/BUILD_BRIEF.md",title:"\u8FD9\u4E00\u7248\u60F3\u505A\u4EC0\u4E48",kind:"build",eyebrow:"\u8BD5\u73A9\u6784\u60F3",initial:{x:864,y:342}}];function Io(e,o){let t=Ar(e.root),n=new Set(o.filter(a=>a.kind==="text").map(a=>Wr(a.path)));return ft.flatMap(a=>{let r=`${t}/${a.relativePath}`;return n.has(r)?[{id:`game:${e.id}:document:${a.relativePath}`,title:a.title,path:r,kind:a.kind,eyebrow:a.eyebrow}]:[]})}function Mr(e,o,t){let n=new Map(ft.map(s=>[`${Ar(e.root)}/${s.relativePath}`,s])),a=Io(e,o).map(s=>{let i=n.get(s.path),g=t[s.path];return{...s,title:wd(g)??s.title,excerpt:Vr(g),initial:i?.initial??{x:0,y:0},width:292,height:188}}),r=a.find(s=>s.kind==="design");if(r?.path!==void 0){let s=vd(t[r.path]);for(let i of s)a.push({id:`${r.id}:section:${i.kind}`,kind:i.kind,title:i.title,eyebrow:i.kind==="character"?"\u4EBA\u7269\u4E0E\u5173\u7CFB":"\u4E16\u754C\u4E0E\u573A\u666F",path:r.path,excerpt:i.excerpt,initial:i.kind==="character"?{x:864,y:588}:{x:864,y:834},width:292,height:188})}return e.previewReady&&a.push({id:`game:${e.id}:preview`,kind:"preview",title:e.title.trim()||"\u53EF\u8BD5\u73A9\u7248\u672C",eyebrow:"\u53EF\u8BD5\u73A9\u7248\u672C",initial:{x:1256,y:342},width:316,height:208}),a}function Or(e){let o=new Map(e.map(n=>[n.kind,n]));return[["source","design","\u6545\u4E8B\u4E0E\u9009\u62E9"],["brief","design","\u4F53\u9A8C\u76EE\u6807"],["concept","design","\u6838\u5FC3\u4E50\u8DA3"],["design","preview","\u5728\u8FD9\u91CC\u73A9\u8D77\u6765"],["art","preview","\u753B\u9762\u4E0E\u6C1B\u56F4"],["build","preview","\u8FD9\u4E00\u7248\u60F3\u8C03\u6574"],["character","preview","\u548C\u8C01\u76F8\u9047"],["world","preview","\u5728\u54EA\u91CC\u63A2\u7D22"]].flatMap(([n,a,r])=>{let s=o.get(n),i=o.get(a);return s===void 0||i===void 0?[]:[{from:s.id,to:i.id,label:r}]})}function vd(e){if(e===void 0)return[];let o=[...e.matchAll(/^(#{1,6})\s+(.+)$/gmu)],t=[];for(let n=0;n<o.length;n+=1){let a=o[n];if(a===void 0)continue;let r=a[2],s=a.index;if(r===void 0||s===void 0)continue;let i=cn(r.replace(/\s+#+\s*$/u,"")),g=xd(i);if(g===void 0||t.some(w=>w.kind===g))continue;let m=s+a[0].length,c=o.slice(n+1).find(w=>(w[1]?.length??7)<=(a[1]?.length??0)),f=e.slice(m,c?.index??e.length),I=Vr(f);I===void 0||/^(?:TODO|TBD|待补|待定|暂无)[。.!！]?$/iu.test(I)||t.push({kind:g,title:un(i,48),excerpt:I})}return t}function xd(e){let o=e.replace(/[\s/·：:、-]+/gu,"");if(/^(?:主要|核心|可玩)?(?:人物|角色)(?:与关系|关系|设定|设计|介绍|档案|列表)?$/u.test(o))return"character";if(/^(?:游戏|故事)?(?:世界|场景)(?:观|与场景|设定|设计|介绍|地图)?$/u.test(o))return"world"}function wd(e){if(e===void 0)return;let o=e.match(/^#\s+(.+)$/mu)?.[1];if(o===void 0)return;let t=cn(o.replace(/\s+#+\s*$/u,"")),n=/^(?:PRODUCT_?BRIEF|SOURCE_?BIBLE|CONCEPT|GAME_?DESIGN|ART_?DIRECTION|BUILD_?BRIEF)(?:\s*[·:：|—–-]\s*(.*))?$/u.exec(t),a=n===null?t:n[1]?.trim()??"";return a.length===0?void 0:un(a,48)}function Vr(e){if(e===void 0)return;let o=!1,t=[];for(let a of e.replace(/<!--[\s\S]*?(?:-->|$)/gu," ").split(/\r?\n/u)){let r=a.trim();if(/^```/u.test(r)){o=!o;continue}if(o||r.length===0||/^#{1,6}\s/u.test(r)||/^\|/u.test(r)||/^\|?\s*:?-{3,}/u.test(r))continue;let s=cn(r.replace(/^(?:[-*+]|\d+[.)])\s+/u,"").replace(/^>\s?/u,""));if(s.length>0&&t.push(s),t.join(" ").length>=132)break}let n=t.join(" ").trim();return n.length===0?void 0:un(n,150)}function cn(e){return e.replace(/<!--[\s\S]*?(?:-->|$)/gu," ").replace(/!\[([^\]]*)\]\([^)]*\)/gu,"$1").replace(/\[([^\]]+)\]\([^)]*\)/gu,"$1").replace(/[*_~`]+/gu,"").replace(/<[^>]+>/gu," ").replace(/[<>]/gu,"").replace(/\s+/gu," ").trim()}function un(e,o){return e.length<=o?e:`${e.slice(0,o-1).trimEnd()}\u2026`}function Ar(e){return Wr(e).replace(/\/$/u,"")}function Wr(e){return e.replaceAll("\\","/").replace(/^\.\//u,"").replace(/\/+/gu,"/")}var ze=require("react/jsx-runtime");function _r(e){let o=(0,hn.useMemo)(()=>Mr(e.project,e.files,e.documents),[e.project,e.files,e.documents]),t=(0,hn.useMemo)(()=>Or(o),[o]),n=a=>{a.path!==void 0?e.onOpenDocument(a.path):a.kind==="preview"&&e.onPlay()};return(0,ze.jsx)(pt,{nodes:o,edges:t,state:e.state,onChange:e.onChange,ariaLabel:"\u6E38\u620F\u521B\u4F5C\u65E0\u9650\u753B\u5E03",helpText:"\u62D6\u52A8\u7A7A\u767D\u5904\u5E73\u79FB \xB7 \u6EDA\u8F6E\u7F29\u653E \xB7 \u53CC\u51FB\u6253\u5F00\u6587\u7A3F",empty:{title:"\u521B\u4F5C\u5185\u5BB9\u4F1A\u51FA\u73B0\u5728\u8FD9\u91CC",description:"\u548C Chat \u4E00\u8D77\u5B8C\u6210\u6E38\u620F\u8BBE\u5B9A\u540E\uFF0C\u6587\u7A3F\u4F1A\u81EA\u7136\u94FA\u5230\u753B\u5E03\u4E0A\u3002",actionLabel:"\u5F00\u59CB\u6784\u601D",onAction:()=>{e.onContinueInChat("\u5F00\u59CB\u6784\u601D\u6E38\u620F")}},onOpen:n,onContinueInChat:a=>{e.onContinueInChat(a.title,a.path)},renderNodeActions:a=>(0,ze.jsxs)(ze.Fragment,{children:[a.path!==void 0&&(0,ze.jsx)("button",{type:"button","data-document-path":a.path,"aria-label":`\u6253\u5F00\u6587\u7A3F\uFF1A${a.title}`,onPointerDown:pn,onClick:r=>{r.stopPropagation(),a.path!==void 0&&e.onOpenDocument(a.path)},children:"\u6253\u5F00\u6587\u7A3F"}),a.kind==="preview"&&(0,ze.jsx)("button",{type:"button",onPointerDown:pn,onClick:r=>{r.stopPropagation(),e.onPlay()},children:"\u8FDB\u5165\u8BD5\u73A9"}),(0,ze.jsx)("button",{type:"button",onPointerDown:pn,onClick:r=>{r.stopPropagation(),e.onContinueInChat(a.title,a.path)},children:"\u5728 Chat \u4E2D\u7EE7\u7EED"})]}),renderContextActions:a=>a.kind==="preview"?(0,ze.jsx)("button",{type:"button",onClick:e.onPlay,children:"\u8FDB\u5165\u8BD5\u73A9"}):a.path!==void 0&&(0,ze.jsx)("button",{type:"button","data-document-path":a.path,"aria-label":`\u6253\u5F00\u6587\u7A3F\uFF1A${a.title}`,onClick:()=>{a.path!==void 0&&e.onOpenDocument(a.path)},children:"\u6253\u5F00\u6587\u7A3F"})})}function pn(e){e.stopPropagation()}var G=require("react/jsx-runtime");function zr({project:e,files:o,editor:t,onChat:n}){let a=o.filter(w=>w.kind==="text"&&w.path.startsWith(`${e.root}/`)),r=ft.flatMap(({relativePath:w,title:u})=>{let b=a.find(R=>R.path===`${e.root}/${w}`);return b===void 0?[]:[{...b,title:u}]}),s=a.filter(w=>!r.some(u=>u.path===w.path)),i=t.selected?.startsWith(`${e.root}/`)===!0&&(a.some(w=>w.path===t.selected)||t.buffers[t.selected]!==void 0)?t.selected:r[0]?.path??a[0]?.path,g=i===void 0?void 0:t.buffers[i],m=r.find(w=>w.path===i)?.title??i?.split("/").at(-1)??"\u521B\u4F5C\u6587\u7A3F",c=g!==void 0&&g.content!==g.saved,f=t.mode==="source",I=(w,u)=>(0,G.jsxs)("button",{type:"button","aria-label":w.path,title:w.path,"aria-current":w.path===i?"page":void 0,onClick:()=>{t.onSelect(w.path)},children:[(0,G.jsx)("span",{children:u}),t.buffers[w.path]!==void 0&&t.buffers[w.path]?.content!==t.buffers[w.path]?.saved&&(0,G.jsx)("i",{title:"\u5C1A\u672A\u4FDD\u5B58"})]},w.path);return(0,G.jsxs)("div",{className:"oh-game-documents",children:[(0,G.jsxs)("nav",{"aria-label":"\u6E38\u620F\u521B\u4F5C\u6587\u7A3F",children:[r.map(w=>I(w,w.title)),s.length>0&&(0,G.jsxs)("details",{open:s.some(w=>w.path===i),children:[(0,G.jsx)("summary",{children:"\u66F4\u591A\u9879\u76EE\u6587\u4EF6"}),s.map(w=>I(w,w.path.slice(e.root.length+1)))]})]}),(0,G.jsxs)("label",{className:"oh-game-doc-picker",children:["\u521B\u4F5C\u6587\u7A3F",(0,G.jsx)("select",{"aria-label":"\u9009\u62E9\u6E38\u620F\u521B\u4F5C\u6587\u7A3F",value:i??"",onChange:w=>{t.onSelect(w.target.value)},children:a.map(w=>(0,G.jsx)("option",{value:w.path,children:r.find(u=>u.path===w.path)?.title??w.path.slice(e.root.length+1)},w.path))})]}),(0,G.jsxs)("section",{className:"oh-game-document-body",children:[(0,G.jsxs)("header",{children:[(0,G.jsxs)("div",{children:[(0,G.jsx)("h2",{children:m}),c&&(0,G.jsx)("span",{className:"oh-game-draft-label",children:"\u672C\u5730\u8349\u7A3F \xB7 \u5C1A\u672A\u4FDD\u5B58"})]}),(0,G.jsxs)("div",{children:[g!==void 0&&g.missing!==!0&&(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)("button",{type:"button",onClick:()=>{t.onMode(f?"preview":"source")},children:f?"\u9605\u8BFB\u6587\u7A3F":"\u7F16\u8F91\u6587\u7A3F"}),c&&(0,G.jsx)("button",{type:"button",disabled:g.saving===!0,onClick:()=>{i!==void 0&&t.onSave(i)},children:g.saving===!0?"\u6B63\u5728\u4FDD\u5B58\u2026":"\u4FDD\u5B58\u6587\u7A3F"})]}),(0,G.jsx)("button",{type:"button","aria-label":"\u8BA8\u8BBA\u8FD9\u4EFD\u6587\u7A3F",onClick:()=>{n(`\u6211\u60F3\u8BA8\u8BBA\u300C${m}\u300D\u8FD9\u4EFD\u521B\u4F5C\u8BBE\u5B9A\u3002${i===void 0?"":`\u6587\u7A3F\uFF1A${i}`} \u8BF7\u5148\u548C\u6211\u8BA8\u8BBA\u601D\u8DEF\u3002`)},children:"Chat"})]})]}),i===void 0?(0,G.jsxs)("div",{className:"oh-game-design-empty",children:[(0,G.jsx)("strong",{children:"\u628A\u60F3\u6CD5\u7559\u5728\u6587\u7A3F\u91CC"}),(0,G.jsx)("p",{children:"\u5148\u548C AI \u8BA8\u8BBA\u6545\u4E8B\u3001\u73A9\u6CD5\u548C\u7F8E\u672F\u65B9\u5411\uFF0C\u5DF2\u6709\u7684\u521B\u4F5C\u5185\u5BB9\u4F1A\u51FA\u73B0\u5728\u8FD9\u91CC\u3002"}),(0,G.jsx)("button",{type:"button",onClick:()=>{n("\u6211\u60F3\u5148\u68B3\u7406\u8FD9\u4E2A\u6E38\u620F\u7684\u6545\u4E8B\u3001\u6838\u5FC3\u73A9\u6CD5\u548C\u7F8E\u672F\u65B9\u5411\uFF0C\u8BF7\u548C\u6211\u8BA8\u8BBA\u601D\u8DEF\u3002")},children:"\u548C AI \u8BA8\u8BBA\u521B\u4F5C\u8BBE\u5B9A"})]}):g===void 0?(0,G.jsxs)("div",{className:"oh-game-design-empty",role:t.errors[i]===void 0?"status":"alert",children:[t.errors[i]??"\u6B63\u5728\u8BFB\u53D6\u521B\u4F5C\u6587\u7A3F\u2026",t.errors[i]!==void 0&&(0,G.jsx)("button",{type:"button",onClick:t.onRetry,children:"\u91CD\u65B0\u8BFB\u53D6"})]}):(0,G.jsxs)(G.Fragment,{children:[g.error!==void 0&&(0,G.jsx)("div",{className:"oh-story-error",role:"alert",children:g.error}),g.conflict!==void 0&&(0,G.jsxs)("div",{className:"oh-story-conflict",role:"alert",children:[(0,G.jsx)("p",{children:g.conflict.message}),g.conflict.theirs!==void 0&&(0,G.jsxs)(G.Fragment,{children:[(0,G.jsx)("button",{type:"button",onClick:()=>{t.onConflict(!0)},children:"\u4FDD\u7559\u6211\u7684\u8349\u7A3F"}),(0,G.jsx)("button",{type:"button",onClick:()=>{t.onConflict(!1)},children:"\u4F7F\u7528\u78C1\u76D8\u7248\u672C"})]})]}),g.missing===!0?(0,G.jsxs)("div",{className:"oh-game-design-empty",children:[(0,G.jsx)("p",{children:"\u6587\u7A3F\u5DF2\u4ECE\u9879\u76EE\u79FB\u9664\uFF0C\u4F60\u7684\u8349\u7A3F\u4ECD\u4FDD\u7559\u5728\u5F53\u524D\u4F1A\u8BDD\u4E2D\u3002"}),(0,G.jsx)("textarea",{"aria-label":`${i} \u672C\u5730\u8349\u7A3F`,value:g.content,readOnly:!0}),(0,G.jsx)("button",{type:"button",onClick:()=>{t.onDiscard(i)},children:"\u653E\u5F03\u672C\u5730\u8349\u7A3F"})]}):f?(0,G.jsx)("textarea",{ref:t.textareaRef,"aria-label":i,value:g.content,spellCheck:i.endsWith(".md"),onChange:w=>{t.onEdit(i,w.target.value)},onBlur:t.onRememberPosition,onScroll:t.onRememberPosition,onSelect:t.onRememberPosition}):i.toLocaleLowerCase().endsWith(".md")?(0,G.jsx)(bo,{content:g.content,label:i}):(0,G.jsx)("pre",{className:"oh-game-source","aria-label":`${i} \u6E90\u7801`,children:g.content}),(0,G.jsxs)("details",{className:"oh-game-document-source",children:[(0,G.jsx)("summary",{children:"\u6587\u7A3F\u6765\u6E90"}),(0,G.jsx)("code",{children:i})]})]})]})]})}var jr={positions:{}};var Lr=`[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-video-chat="closed"]:has(> [data-slot="conversation.session"] > .oh-story-split-surface[data-open="true"]) { grid-template-columns:minmax(0,1fr) 0; }
[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-video-chat="closed"] > [data-slot="conversation.session"] > :not(.oh-story-split-surface),
[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-video-chat="closed"] > [data-composer-seat] { display:none; }
.oh-video-studio { container-type:inline-size; --video-accent:var(--dsw-alias-brand-primary,#668be3); --video-warning:var(--dsw-alias-state-warning-primary,#b8995e); }
.oh-video-toolbar { min-height:0;grid-template-columns:auto minmax(120px,1fr) auto auto;grid-template-rows:auto;gap:8px 12px;padding:8px 12px; }
.oh-video-mode-tabs { border-radius:6px; }
.oh-video-mode-tabs button { min-width:0;min-height:26px;padding:3px 7px;font-size:11px; }
.oh-video-project { grid-column:2;grid-row:1; }
.oh-video-project select { max-width:330px; }
.oh-video-tabs { grid-column:3;grid-row:1; }
.oh-video-workspace-actions { grid-column:4;grid-row:1;display:flex;justify-content:flex-end;gap:6px; }
@container (max-width:800px) { .oh-video-toolbar { grid-template-columns:minmax(0,1fr) auto;grid-template-rows:auto auto; }.oh-video-project { grid-column:1;grid-row:2; }.oh-video-project select { max-width:none; }.oh-video-tabs { grid-column:2;grid-row:1; }.oh-video-workspace-actions { grid-column:2;grid-row:2; } }
.oh-video-workspace-actions button,.oh-video-version-notice button,.oh-video-script-panel button,.oh-video-preview-empty button,.oh-video-document-export button,.oh-video-details button { min-height:30px;border:1px solid var(--os-border);border-radius:6px;padding:5px 9px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);cursor:pointer;font:12px/1.5 var(--dsw-font-family); }
.oh-video-studio button:focus-visible,.oh-video-details button:focus-visible,.oh-video-details select:focus-visible,.oh-video-studio a:focus-visible { outline:2px solid var(--video-accent);outline-offset:2px; }
.oh-video-studio button:disabled { cursor:default;opacity:.55; }
.oh-video-workspace-actions button[aria-pressed=true] { background:var(--dsw-alias-interactive-bg-hover); }
.oh-video-preview-layout { position:relative;display:grid;grid-template-columns:minmax(0,1fr) 292px;min-height:0;flex:1;gap:22px;padding:22px;overflow:hidden;background:var(--dsw-alias-bg-layer-1); }
.oh-video-preview-main { display:flex;flex-direction:column;min-width:0;min-height:0;gap:16px;overflow:auto;scrollbar-width:thin; }
.oh-video-preview-shell { flex:none;grid-template-rows:auto auto auto;border:1px solid var(--os-border);border-radius:9px;background:var(--dsw-alias-bg-base); }
.oh-video-stagebar { display:flex;justify-content:space-between;gap:8px;padding:4px 8px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base); }
.oh-video-version-tabs { border:0;gap:3px;padding:0; }
.oh-video-version-tabs button { min-height:29px;padding:4px 8px;font-size:11px; }
.oh-video-version-tabs button[aria-selected=true] { color:var(--video-accent);background:var(--dsw-alias-interactive-bg-hover);box-shadow:none; }
.oh-video-preview-actions { gap:5px;align-items:center;flex-wrap:wrap;justify-content:flex-end; }
.oh-video-preview-actions a,.oh-video-preview-actions button { border-color:var(--os-border);min-height:28px;min-width:28px;border-radius:5px;padding:3px 7px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);font-size:11px;white-space:nowrap; }
.oh-video-preview-actions a:hover,.oh-video-preview-actions button:hover { background:var(--dsw-alias-interactive-bg-hover); }
.oh-video-player-stage { position:relative;width:100%;aspect-ratio:16/9;max-height:max(220px,calc(100dvh - 260px));min-height:170px;padding:0;background:#111820; }
.oh-video-player-stage video { width:100%;height:100%;max-width:100%;max-height:100%;border-radius:0;box-shadow:none;object-fit:contain; }
.oh-video-player-caption { display:flex;justify-content:space-between;align-items:center;gap:10px;min-height:29px;padding:4px 10px;box-sizing:border-box;color:var(--dsw-alias-label-secondary);font-size:10px; }
.oh-video-preview-shell:fullscreen { display:flex;flex-direction:column;border:0;border-radius:0; }
.oh-video-preview-shell:fullscreen .oh-video-context-action { display:none; }
.oh-video-preview-shell:fullscreen .oh-video-stagebar,.oh-video-preview-shell:fullscreen .oh-video-player-caption { flex:none; }
.oh-video-preview-shell:fullscreen .oh-video-player-stage { flex:1;min-height:0;max-height:none;aspect-ratio:auto; }
.oh-video-preview-shell:fullscreen video { position:absolute;inset:0; }
.oh-video-media-error { position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:15px;background:#18212bf2;color:#fff;font-size:13px; }
.oh-video-media-error button,.oh-video-media-error a { padding:7px 12px;border:1px solid #ffffff40;border-radius:5px;background:transparent;color:inherit;text-decoration:none;cursor:pointer; }
.oh-video-version-notice { display:flex;align-items:center;justify-content:space-between;gap:15px;padding:11px 13px;border:1px solid var(--os-border);border-radius:8px;background:var(--dsw-alias-bg-base);font-size:12px; }
.oh-video-version-notice>div { display:flex;flex-direction:column;gap:5px; }.oh-video-version-notice span { color:var(--os-muted);font-size:11px; }.oh-video-version-notice button { flex:none; }
.oh-video-notice { margin:0;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:1.8; }
.oh-video-script-panel { display:flex;min-width:0;min-height:0;flex-direction:column;border:1px solid var(--os-border);border-radius:9px;background:var(--dsw-alias-bg-base);overflow:hidden; }
.oh-video-script-panel>header { display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 8px 8px 14px;border-bottom:1px solid var(--os-border); }.oh-video-script-panel h3 { margin:0;font-weight:550;font-size:13px; }.oh-video-script-panel h3 small { margin-left:5px;color:var(--dsw-alias-label-secondary);font-size:10px;font-weight:400; }.oh-video-script-panel header>button { padding:0;min-width:28px;border-color:transparent;font-size:17px; }
.oh-video-segment-list { min-height:0;flex:1;overflow:auto;padding:8px;scrollbar-width:thin; }
.oh-video-script-segment { border:1px solid transparent;border-radius:7px;margin-bottom:6px; }.oh-video-script-segment[data-selected=true] { border-color:var(--video-accent);background:var(--dsw-alias-interactive-bg-hover); }.oh-video-script-panel .oh-video-segment-jump { display:block;width:100%;min-height:0;border:0;padding:11px 10px 7px;background:transparent;text-align:left; }.oh-video-script-panel .oh-video-segment-jump:disabled { opacity:1; }.oh-video-segment-jump>span { display:flex;align-items:center;justify-content:space-between;gap:7px;font-size:11px;color:var(--dsw-alias-label-secondary); }.oh-video-segment-jump small { font-size:10px;white-space:nowrap; }.oh-video-segment-jump p { margin:10px 0 0;font-size:13px;line-height:1.9;white-space:pre-wrap;overflow-wrap:anywhere; }.oh-video-script-segment[data-kind=original] .oh-video-segment-jump>span { color:var(--dsw-alias-state-success-primary,#71977b); }
.oh-video-script-segment>footer { display:flex;justify-content:space-between;align-items:center;gap:8px;padding:0 10px 9px; }.oh-video-script-segment>footer>div { display:flex;gap:7px; }.oh-video-script-panel footer button { min-height:24px;border:0;padding:0;background:transparent;font-size:10px;color:var(--dsw-alias-label-secondary); }.oh-video-script-segment>footer>span { font-size:10px;color:var(--dsw-alias-label-secondary); }
.oh-video-script-empty { padding:35px 14px;text-align:center; }.oh-video-script-empty button { font-size:11px; }
.oh-video-studio[data-chat-open=true] .oh-video-preview-layout,.oh-video-preview-layout[data-script-collapsed=true] { grid-template-columns:minmax(0,1fr); }.oh-video-studio[data-chat-open=true] .oh-video-script-panel,.oh-video-preview-layout[data-script-collapsed=true] .oh-video-script-panel { display:none; }
.oh-video-preview-layout[data-script-open=true] .oh-video-script-panel { display:flex;position:absolute;inset:12px 12px 12px auto;width:min(320px,calc(100% - 24px));z-index:10;box-shadow:0 12px 40px rgb(0 0 0 / 12%); }
.oh-video-preview-empty { color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1);gap:14px; }.oh-video-preview-empty>span { display:grid;place-items:center;width:70px;height:70px;border:1px solid var(--os-border);border-radius:18px;background:var(--dsw-alias-bg-base); }.oh-video-preview-empty strong { color:var(--dsw-alias-label-primary);font-size:20px;font-weight:550; }.oh-video-preview-empty p { font-size:13px;max-width:430px;line-height:2; }
.oh-video-documents { flex:1;min-height:0; }.oh-video-script-document,.oh-video-readable-plan { max-width:780px;padding-inline:26px; }.oh-video-script-document>section,.oh-video-readable-plan>section { padding:20px 0;border-bottom:1px solid var(--os-border); }.oh-video-script-document>section:last-child,.oh-video-readable-plan>section:last-child { border-bottom:0; }.oh-video-script-document header { display:flex;align-items:center;justify-content:space-between;gap:12px;color:var(--dsw-alias-label-secondary);font-size:11px; }.oh-video-script-document strong { font-weight:500; }.oh-video-script-document p,.oh-video-readable-plan p { font-size:14px;line-height:2;white-space:pre-wrap;overflow-wrap:anywhere; }.oh-video-readable-plan h3 { margin:0;font-size:12px;font-weight:500;color:var(--dsw-alias-label-secondary); }.oh-video-script-document textarea { width:100%;min-height:110px!important;margin-top:14px;resize:vertical;flex:none!important;box-sizing:border-box;font:14px/1.9 var(--dsw-font-family); }.oh-video-document-note { margin-top:26px;font-size:11px;line-height:1.9;color:var(--dsw-alias-label-secondary); }.oh-video-document-export { display:flex;justify-content:flex-end;padding:7px 15px;border-top:1px solid var(--os-border);background:var(--dsw-alias-bg-base); }.oh-video-document-export:empty { display:none; }.oh-video-document-export button { font-size:11px; }
.oh-video-details { width:min(680px,calc(100vw - 36px));max-height:calc(100dvh - 60px);box-sizing:border-box;border:1px solid var(--dsw-alias-border-l1,#dbe2ed);border-radius:12px;padding:22px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);font-family:var(--dsw-font-family); }.oh-video-details::backdrop { background:rgb(10 20 40 / 25%); }.oh-video-details>header { display:flex;align-items:center;justify-content:space-between;gap:15px;margin-bottom:20px; }.oh-video-details h2 { font-size:17px;margin:0; }.oh-video-details details { padding:12px 0; }.oh-video-details summary { font-size:13px;cursor:pointer;margin-bottom:10px; }.oh-video-details label { display:flex;gap:12px;align-items:center;margin-block:15px;font-size:12px; }.oh-video-details select { min-width:0;flex:1;border:1px solid var(--dsw-alias-border-l1,#dbe2ed);border-radius:5px;padding:7px;color:inherit;background:var(--dsw-alias-bg-layer-1); }.oh-video-details>small { display:block;overflow-wrap:anywhere;color:var(--dsw-alias-label-secondary);font-size:11px; }.oh-video-details pre { max-height:350px;overflow:auto;white-space:pre-wrap;overflow-wrap:anywhere;padding:15px;border-radius:7px;background:var(--dsw-alias-bg-layer-1);font:12px/1.8 var(--dsw-font-family-mono,monospace); }
@container (max-width:800px) { .oh-video-preview-layout { grid-template-columns:minmax(0,1fr);padding:16px;gap:0; }.oh-video-script-panel { display:none; }.oh-video-player-stage { max-height:max(200px,calc(100dvh - 300px)); }.oh-video-player-caption { font-size:9px; }.oh-video-version-tabs button { padding:4px 6px;font-size:10px; }.oh-video-preview-actions a,.oh-video-preview-actions button { font-size:10px; }.oh-video-documents .oh-game-document-body>header { flex-wrap:wrap; } }
[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"] .oh-video-toolbar { min-height:0;grid-template-columns:minmax(0,1fr) auto auto;grid-template-rows:42px auto;gap:6px;padding:4px 8px 8px; }.oh-video-toolbar .oh-video-workspace-actions { font-size:11px; }
[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"] .oh-video-mode-tabs button { min-height:31px; }
/* \u5236\u4F5C/\u5BF9\u8BDD owns this state below 720px; a second control would only repeat it. */
[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"] .oh-video-chat-toggle { display:none; }
[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"] .oh-video-tabs { grid-column:2;grid-row:2;justify-self:start; }
[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"] .oh-video-workspace-actions { grid-column:3;grid-row:2; }
[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"] .oh-video-project { grid-column:1;grid-row:2; }
@container (max-width:420px) { [data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"] .oh-video-toolbar { grid-template-columns:minmax(0,1fr) auto;grid-template-rows:42px auto auto; }[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"] .oh-video-project { grid-column:1/-1;grid-row:2; }[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"] .oh-video-tabs { grid-column:1;grid-row:3; }[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"] .oh-video-workspace-actions { grid-column:2;grid-row:3; } }
[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"] .oh-video-preview-shell { grid-template-rows:auto auto auto; }
[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"] .oh-video-stagebar { grid-template-rows:none;gap:4px;padding:4px 6px; }
[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"] .oh-video-preview-actions { grid-row:auto; }
@media(prefers-reduced-motion:reduce) { .oh-video-studio * { scroll-behavior:auto; } }
.oh-video-canvas-thumbnail { display:block;width:100%;height:128px;flex:none;object-fit:cover;background:#18212b;pointer-events:none; }
.oh-video-draft-wording { display:block;margin-top:6px;color:var(--dsw-alias-state-warning-primary,#9c845b);font-size:10px; }
/* The workbench replaces DSH's conversation width geometry, like the game pane. */
.oh-video-studio { z-index:9; }
.oh-video-studio .oh-game-canvas-node-copy { overflow:hidden; }
.oh-video-studio .oh-game-canvas-node-copy p { -webkit-line-clamp:2; }
.oh-video-studio .oh-game-canvas-node[data-kind="preview"] .oh-game-canvas-node-copy::before { display:none; }
`;var Gr=`.oh-game-canvas-shell {
  --oh-game-canvas-accent: var(--dsw-alias-state-business-primary);
  --oh-game-canvas-border: var(--dsw-alias-border-l2);
  position: relative;
  display: flex;
  min-width: 0;
  min-height: 0;
  height: 100%;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-base);
  font-family: var(--dsw-font-family);
}

.oh-game-canvas-toolbar {
  z-index: 4;
  display: flex;
  min-height: 44px;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0 14px 0 18px;
  border-bottom: 1px solid var(--oh-game-canvas-border);
  background: var(--dsw-alias-bg-base);
}

.oh-game-canvas-help { color: var(--dsw-alias-label-secondary); font-size: 12px; }
.oh-game-canvas-controls { display: flex; align-items: center; gap: 3px; }
.oh-game-canvas-controls span { min-width: 42px; color: var(--dsw-alias-label-secondary); text-align: center; font-size: 11px; font-variant-numeric: tabular-nums; }
.oh-game-canvas-controls button,
.oh-game-canvas-context button,
.oh-game-canvas-node footer button,
.oh-game-canvas-empty button {
  min-height: 28px;
  border: 1px solid var(--oh-game-canvas-border);
  border-radius: 7px;
  padding: 3px 9px;
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-base);
  cursor: pointer;
  font: 12px/1.4 var(--dsw-font-family);
}
.oh-game-canvas-controls button { min-width: 28px; padding-inline: 7px; }
.oh-game-canvas-controls button:hover,
.oh-game-canvas-context button:hover,
.oh-game-canvas-node footer button:hover,
.oh-game-canvas-empty button:hover { background: var(--dsw-alias-interactive-bg-hover); }
.oh-game-canvas-controls button:focus-visible,
.oh-game-canvas-context button:focus-visible,
.oh-game-canvas-node:focus-visible,
.oh-game-canvas-node footer button:focus-visible,
.oh-game-canvas-empty button:focus-visible { outline: 2px solid var(--oh-game-canvas-accent); outline-offset: 2px; }

.oh-game-canvas-viewport {
  position: relative;
  min-width: 0;
  min-height: 0;
  flex: 1;
  overflow: hidden;
  outline: none;
  background-color: var(--dsw-alias-bg-layer-1);
  background-image: radial-gradient(circle, color-mix(in srgb, var(--dsw-alias-label-secondary) 28%, transparent) 1px, transparent 1px);
  cursor: grab;
  touch-action: none;
  user-select: none;
}
.oh-game-canvas-viewport[data-panning="true"] { cursor: grabbing; }
.oh-game-canvas-viewport:focus-visible { box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--oh-game-canvas-accent) 70%, transparent); }

.oh-game-canvas-stage { position: absolute; inset: 0 auto auto 0; width: 1px; height: 1px; transform-origin: 0 0; }
.oh-game-canvas-stage > svg { position: absolute; inset: 0; width: 1px; height: 1px; overflow: visible; pointer-events: none; }
.oh-game-canvas-edge { fill: none; stroke: color-mix(in srgb, var(--dsw-alias-label-secondary) 32%, transparent); stroke-width: 1.5; vector-effect: non-scaling-stroke; }
.oh-game-canvas-edge[data-active="true"] { stroke: var(--oh-game-canvas-accent); stroke-width: 2; }
.oh-game-canvas-edge-label { fill: var(--dsw-alias-label-secondary); paint-order: stroke; stroke: var(--dsw-alias-bg-layer-1); stroke-width: 8px; stroke-linejoin: round; text-anchor: middle; font: 11px/1 var(--dsw-font-family); }
.oh-game-canvas-edge-label[data-active="true"] { fill: var(--oh-game-canvas-accent); }

.oh-game-canvas-node {
  position: absolute;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--oh-game-canvas-border);
  border-radius: 12px;
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-base);
  box-shadow: 0 5px 18px rgb(0 0 0 / 5%);
  cursor: grab;
  transform: translateZ(0);
  transition: border-color 120ms ease, box-shadow 120ms ease;
}
.oh-game-canvas-node:hover { border-color: color-mix(in srgb, var(--dsw-alias-label-secondary) 54%, transparent); box-shadow: 0 8px 22px rgb(0 0 0 / 8%); }
.oh-game-canvas-node[data-selected="true"] { border-color: var(--oh-game-canvas-accent); box-shadow: 0 0 0 2px color-mix(in srgb, var(--oh-game-canvas-accent) 16%, transparent), 0 8px 24px rgb(0 0 0 / 8%); }
.oh-game-canvas-node[data-dragging="true"] { cursor: grabbing; box-shadow: 0 12px 30px rgb(0 0 0 / 13%); }
.oh-game-canvas-node[data-kind="brief"] { background: color-mix(in srgb, #fff6d8 30%, var(--dsw-alias-bg-base)); }
.oh-game-canvas-node[data-kind="preview"] { border-color: color-mix(in srgb, var(--oh-game-canvas-accent) 38%, var(--oh-game-canvas-border)); background: linear-gradient(145deg, color-mix(in srgb, var(--oh-game-canvas-accent) 8%, var(--dsw-alias-bg-base)), var(--dsw-alias-bg-base) 66%); }
.oh-game-canvas-node > header { display: flex; min-height: 38px; align-items: center; justify-content: space-between; padding: 0 14px; border-bottom: 1px solid var(--oh-game-canvas-border); }
.oh-game-canvas-node > header small { color: var(--dsw-alias-label-secondary); font-size: 11px; font-weight: 500; }
.oh-game-canvas-node > header span { color: var(--dsw-alias-label-secondary); font-size: 10px; letter-spacing: 1px; }
.oh-game-canvas-node-copy { min-height: 0; flex: 1; padding: 16px 16px 10px; }
.oh-game-canvas-node-copy strong { display: block; overflow: hidden; font-size: 16px; line-height: 1.35; text-overflow: ellipsis; white-space: nowrap; }
.oh-game-canvas-node-copy p { display: -webkit-box; overflow: hidden; margin: 10px 0 0; color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 1.7; -webkit-box-orient: vertical; -webkit-line-clamp: 3; }
.oh-game-canvas-node[data-kind="preview"] .oh-game-canvas-node-copy::before { content: "\u25B6"; display: grid; width: 36px; height: 36px; margin-bottom: 12px; place-items: center; border-radius: 50%; color: var(--oh-game-canvas-accent); background: color-mix(in srgb, var(--oh-game-canvas-accent) 12%, transparent); font-size: 12px; }
.oh-game-canvas-node > footer { display: flex; min-height: 42px; align-items: center; gap: 6px; padding: 6px 10px; border-top: 1px solid var(--oh-game-canvas-border); }
.oh-game-canvas-node > footer button { overflow: hidden; min-width: 0; flex: 0 1 auto; border-color: transparent; padding-inline: 7px; color: var(--dsw-alias-label-secondary); text-overflow: ellipsis; white-space: nowrap; }
.oh-game-canvas-node > footer button:first-child { color: var(--oh-game-canvas-accent); background: color-mix(in srgb, var(--oh-game-canvas-accent) 8%, transparent); }

.oh-game-canvas-context {
  z-index: 5;
  display: flex;
  min-height: 48px;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-top: 1px solid var(--oh-game-canvas-border);
  background: var(--dsw-alias-bg-base);
  box-shadow: 0 -8px 24px rgb(0 0 0 / 4%);
}
.oh-game-canvas-context > span { display: flex; min-width: 0; flex: 1; flex-direction: column; }
.oh-game-canvas-context small { color: var(--dsw-alias-label-secondary); font-size: 10px; }
.oh-game-canvas-context strong { overflow: hidden; font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }

.oh-game-canvas-empty { position: absolute; z-index: 3; inset: 50% auto auto 50%; display: flex; width: min(360px, calc(100% - 40px)); box-sizing: border-box; flex-direction: column; align-items: center; gap: 8px; padding: 28px; border: 1px solid var(--oh-game-canvas-border); border-radius: 14px; background: color-mix(in srgb, var(--dsw-alias-bg-base) 92%, transparent); box-shadow: 0 10px 36px rgb(0 0 0 / 7%); text-align: center; transform: translate(-50%, -50%); }
.oh-game-canvas-empty strong { font-size: 15px; }
.oh-game-canvas-empty span { color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 1.6; }
.oh-game-canvas-empty button { margin-top: 5px; color: var(--oh-game-canvas-accent); }

@media (max-width: 720px) {
  .oh-game-canvas-toolbar { min-height: 40px; padding-inline: 10px; }
  .oh-game-canvas-help { display: none; }
  .oh-game-canvas-controls { width: 100%; justify-content: flex-end; }
  .oh-game-canvas-context { overflow-x: auto; }
  .oh-game-canvas-context > span { min-width: 120px; }
}

@media (prefers-reduced-motion: reduce) {
  .oh-game-canvas-node { transition: none; }
}
`;function Fr(e){let o=e.frameError||e.probe==="failed";return e.building?{tone:"building",label:"Agent \u6B63\u5728\u66F4\u65B0\u6E38\u620F\u6587\u4EF6 \xB7 \u5F53\u524D\u9884\u89C8\u4FDD\u6301\u4E0D\u53D8"}:e.pending?{tone:e.frameLoaded&&!o?"ready":"loading",label:"\u65B0\u7248\u672C\u5DF2\u5C31\u7EEA \xB7 \u7531\u4F60\u51B3\u5B9A\u4F55\u65F6\u8F7D\u5165"}:o?{tone:"error",label:"\u9884\u89C8\u8F7D\u5165\u5931\u8D25 \xB7 \u53EF\u91CD\u65B0\u8F7D\u5165"}:e.frameLoaded?{tone:"ready",label:e.isolated?"\u9884\u89C8\u5DF2\u8F7D\u5165":"\u9884\u89C8\u5DF2\u8F7D\u5165 \xB7 \u5F53\u524D\u90E8\u7F72\u65E0\u6CD5\u9694\u79BB\u6765\u6E90\uFF0C\u5B58\u6863\u529F\u80FD\u4E0D\u53EF\u7528"}:{tone:"loading",label:"\u6B63\u5728\u8F7D\u5165\u9884\u89C8\u2026"}}function Hr(e,o,t,n){let a=new URL(e,n);a.searchParams.set("build",o),a.searchParams.set("reload",String(t));let r=a.toString();return a.hostname==="127.0.0.1"?a.hostname="localhost":a.hostname==="localhost"&&(a.hostname="127.0.0.1"),{href:a.toString(),probeHref:r,isolated:a.origin!==new URL(n).origin}}function qr(e,o,t){let n=typeof e.requestDraftInitialization=="function",a=t!==void 0&&n?e.requestDraftInitialization?.(o,{prompt:t,whenDraftExists:"keep"}):void 0;return e.for(o.ctx).focus(),t===void 0||a==="applied"}var mn=`.oh-story-bridge-marker { display: none; }
.oh-story-welcome {
  box-sizing: border-box;
  order: -1;
  flex-shrink: 0;
  width: min(640px, calc(100% - 32px));
  margin: 24px auto;
  padding: 20px 24px;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 12px;
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-base);
  font: 14px/1.7 var(--dsw-font-family);
  overflow-wrap: anywhere;
}
.oh-story-welcome h2 { margin: 0; font-size: 20px; }
.oh-story-welcome p { margin: 8px 0 0; }
.oh-story-welcome ol { margin: 12px 0; padding-left: 24px; }
.oh-story-welcome code,
.oh-story-plugin-config code {
  padding: 1px 5px;
  border-radius: 4px;
  background: var(--dsw-alias-markdown-inline-code);
  font: 12px/1.5 ui-monospace, SFMono-Regular, Menlo, monospace;
}
.oh-story-welcome-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 12px;
  margin-bottom: 8px;
}
.oh-story-welcome-dismiss {
  min-height: 28px;
  flex: none;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 999px;
  color: var(--dsw-alias-label-secondary);
  background: var(--dsw-alias-bg-base);
  padding: 3px 11px;
  cursor: pointer;
  font: 12px/1.4 var(--dsw-font-family);
}
.oh-story-welcome-dismiss:hover:not(:disabled) { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-interactive-bg-hover); }
.oh-story-welcome-dismiss:focus-visible,
.oh-story-plugin-switch:focus-visible { outline: 2px solid var(--dsw-alias-state-business-primary); outline-offset: 2px; }
.oh-story-welcome-dismiss:disabled,
.oh-story-plugin-switch:disabled { opacity: .5; cursor: default; }
.oh-story-welcome-note { color: var(--dsw-alias-label-secondary); font-size: 12px; }
.oh-story-plugin-config {
  box-sizing: border-box;
  display: grid;
  gap: 8px;
  padding: 14px 16px;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 10px;
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-layer-1);
  font: 13px/1.55 var(--dsw-font-family);
}
.oh-story-plugin-config-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}
.oh-story-plugin-config-copy { display: grid; min-width: 0; gap: 3px; }
.oh-story-plugin-config-copy strong { font-size: 13px; font-weight: 600; }
.oh-story-plugin-config-copy span { color: var(--dsw-alias-label-secondary); font-size: 12px; }
.oh-story-plugin-switch {
  position: relative;
  width: 38px;
  height: 22px;
  flex: none;
  padding: 2px;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 999px;
  background: var(--dsw-alias-bg-base);
  cursor: pointer;
  transition: background-color .15s ease, border-color .15s ease;
}
.oh-story-plugin-switch[aria-checked="true"] {
  border-color: var(--dsw-alias-state-business-primary);
  background: var(--dsw-alias-state-business-primary);
}
.oh-story-plugin-switch > i {
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--dsw-alias-label-secondary);
  transition: transform .15s ease, background-color .15s ease;
}
.oh-story-plugin-switch[aria-checked="true"] > i { transform: translateX(16px); background: #fff; }
.oh-story-plugin-config-error { margin: 0; color: var(--dsw-alias-state-error-primary); font-size: 12px; }
.oh-story-split-surface { display: contents; font-family: var(--dsw-font-family); }

/* Collapsed, the plugin owns nothing but this control: DSH renders the
   conversation exactly as it does without the plugin installed. The launcher is
   fixed to the conversation column's own corner, which the bridge publishes,
   because the surrounding shell is not ours to place things in. */
.oh-story-launcher {
  box-sizing: border-box;
  display: flex;
  position: fixed;
  z-index: 9;
  top: calc(var(--oh-story-seam-top, 0px) + 10px);
  right: calc(var(--oh-story-seam-right, 0px) + 14px);
  min-height: 28px;
  align-items: center;
  gap: 6px;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 999px;
  color: var(--dsw-alias-label-secondary);
  background: var(--dsw-alias-bg-base);
  padding: 3px 11px;
  cursor: pointer;
  font-family: var(--dsw-font-family);
  font-size: 12px;
  line-height: 20px;
}
.oh-story-launcher b { font-weight: 500; }
.oh-story-launcher:hover { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-interactive-bg-hover); }
.oh-story-launcher:focus-visible { outline: 2px solid var(--dsw-alias-state-business-primary); outline-offset: 2px; }

/* DSH documents every [data-slot] wrapper as a stable addressable styling
   seam. The official Session body and composer stay mounted; this only turns
   their scroll host into a three-column writing surface. */
[data-conversation-scroll]:has(> [data-slot="conversation.session"] > .oh-story-split-surface[data-open="true"]) {
  --os-border: var(--dsw-alias-border-l2);
  --os-muted: var(--dsw-alias-label-secondary);
  display: grid;
  grid-template-columns: clamp(184px, 16%, 200px) minmax(240px, 1fr) clamp(408px, 40%, 520px);
  grid-template-rows: minmax(0, 1fr);
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  scrollbar-gutter: stable;
  scroll-padding-bottom: calc(max(var(--dsh-composer-height, 152px), var(--oh-story-composer-height, 0px)) + 16px);
}

/* Keep the final Chat flow above the overlapping official Composer. */
[data-conversation-scroll]:has(> [data-slot="conversation.session"] > .oh-story-split-surface[data-open="true"])
  > [data-slot="conversation.session"] > :not(.oh-story-split-surface) {
  grid-column: 3;
  grid-row: 1;
  min-width: 0;
  min-height: 100%;
  border-left: 1px solid var(--os-border);
}

/* DSH 0.1.7 nests a data-chat-flow inside every step-process group; only the top-level flow needs room. */
[data-conversation-scroll]:has(> [data-slot="conversation.session"] > .oh-story-split-surface[data-open="true"])
  [data-chat-flow]:not([data-step-process-content]) {
  padding-bottom: calc(max(var(--dsh-composer-height, 152px), var(--oh-story-composer-height, 0px)) + 16px);
}

[data-conversation-scroll]:has(> [data-slot="conversation.session"] > .oh-story-split-surface[data-open="true"])
  > [data-composer-seat] {
  grid-column: 3;
  grid-row: 1;
  align-self: start;
  min-width: 0;
  width: 100%;
  position: sticky;
  top: calc(var(--oh-story-scroll-height, 720px) - max(var(--dsh-composer-height, 152px), var(--oh-story-composer-height, 0px)));
  bottom: auto;
}

/* Game mode keeps the official Conversation on the right but merges the two
   creator columns into one playable Studio. */
[data-conversation-scroll][data-oh-story-workbench="game"]:has(> [data-slot="conversation.session"] > .oh-story-split-surface[data-open="true"]) {
  --game-stage: #0d100e;
  --game-stage-raised: #161a17;
  --game-accent: var(--dsw-alias-state-business-primary);
  --game-warning: #f4bd55;
  --game-danger: #f06b63;
  grid-template-columns: minmax(0, 1fr) clamp(400px, 34%, 520px);
  overflow: hidden;
}

[data-conversation-scroll][data-oh-story-workbench="game"]:has(> [data-slot="conversation.session"] > .oh-story-split-surface[data-open="true"])
  > [data-slot="conversation.session"] > :not(.oh-story-split-surface),
[data-conversation-scroll][data-oh-story-workbench="game"]:has(> [data-slot="conversation.session"] > .oh-story-split-surface[data-open="true"])
  > [data-composer-seat] { grid-column: 2; }

/* DSH 0.1.2 lays two 40px column-resize strips (z-index 8) over the whole
   conversation area. The workbench replaces that column geometry, so the strip
   no longer marks a real column seam here \u2014 it just swallows clicks on the
   right edge of the file tree. The creator panes take the clicks back. */
.oh-story-tree,
.oh-story-editor {
  box-sizing: border-box;
  grid-row: 1;
  position: sticky;
  z-index: 9;
  top: 0;
  align-self: start;
  min-width: 0;
  min-height: 0;
  height: 100%;
  color: inherit;
  background: var(--dsw-alias-bg-base);
}

.oh-game-studio {
  box-sizing: border-box;
  display: flex;
  grid-column: 1;
  grid-row: 1;
  position: sticky;
  z-index: 9;
  top: 0;
  min-width: 0;
  min-height: 0;
  height: 100%;
  align-self: start;
  overflow: hidden;
  flex-direction: column;
  border-right: 1px solid var(--os-border);
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-base);
}
.oh-game-studio[hidden] { display: none; }

.oh-game-toolbar {
  box-sizing: border-box;
  display: grid;
  min-height: 56px;
  flex: none;
  grid-template-columns: auto minmax(160px, 1fr) auto;
  align-items: center;
  gap: 9px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--os-border);
  background: var(--dsw-alias-bg-base);
}

.oh-game-mode-tabs {
  display: flex;
  margin-right: 2px;
  padding-right: 9px;
  border-right: 1px solid var(--os-border);
}
.oh-game-mode-tabs button {
  min-width: 42px;
  min-height: 36px;
  border: 0;
  border-radius: 5px;
  color: var(--os-muted);
  background: transparent;
  padding: 4px 7px;
  cursor: pointer;
  white-space: nowrap;
  font: 11px/1 var(--dsw-font-family);
}
.oh-game-mode-tabs button:hover { color: var(--dsw-alias-label-primary); }
.oh-game-mode-tabs button[aria-selected="true"] { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-button-ghost-active-fill); font-weight: 500; }

.oh-game-project { display: flex; min-width: 0; align-items: center; gap: 7px; color: var(--os-muted); font-size: 11px; }
.oh-game-project > span { flex: none; }
.oh-game-project select {
  min-width: 0;
  max-width: 360px;
  min-height: 36px;
  flex: 1;
  overflow: hidden;
  border: 1px solid var(--os-border);
  border-radius: 8px;
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-base);
  padding: 6px 28px 6px 9px;
  text-overflow: ellipsis;
  font: inherit;
  font-weight: 500;
}
.oh-game-project select:focus-visible,
.oh-game-mode-tabs button:focus-visible,
.oh-game-tabs button:focus-visible,
.oh-game-preview-status button:focus-visible,
.oh-game-mobile-switcher button:focus-visible { outline: 2px solid var(--dsw-alias-state-business-primary); outline-offset: 1px; }

.oh-game-tabs,
.oh-game-mobile-switcher {
  display: flex;
  padding: 2px;
  border: 1px solid var(--os-border);
  border-radius: 9px;
  background: var(--dsw-alias-bg-base);
}
.oh-game-tabs button,
.oh-game-mobile-switcher button {
  min-width: 56px;
  min-height: 36px;
  border: 0;
  border-radius: 6px;
  color: var(--os-muted);
  background: transparent;
  cursor: pointer;
  font: 12px/1 var(--dsw-font-family);
}
.oh-game-tabs button:hover,
.oh-game-mobile-switcher button:hover { color: var(--dsw-alias-label-primary); }
.oh-game-tabs button[aria-selected="true"],
.oh-game-mobile-switcher button[aria-selected="true"] { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-button-ghost-active-fill); box-shadow: 0 1px 2px rgb(0 0 0 / 7%); font-weight: 600; }
.oh-game-panels,
.oh-game-panel {
  display: flex;
  min-width: 0;
  min-height: 0;
  flex: 1;
  overflow: hidden;
  flex-direction: column;
}
.oh-game-panel[hidden] { display: none; }

.oh-game-preview-shell {
  display: grid;
  min-width: 0;
  min-height: 0;
  flex: 1;
  grid-template-rows: 40px minmax(0, 1fr);
  position: relative;
  overflow: hidden;
  border-top: 2px solid var(--game-accent);
  background-color: var(--game-stage);
}
.oh-game-preview-shell[data-state="building"] { border-top-color: var(--game-warning); animation: oh-game-build-line 1.4s linear infinite; }
.oh-game-preview-shell[data-state="error"] { border-top-color: var(--game-danger); }
.oh-game-preview-status {
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 10px 0 12px;
  color: rgb(244 248 240 / 76%);
  background: var(--game-stage-raised);
  font-size: 11px;
}
.oh-game-runtime-state { display: inline-flex; overflow: hidden; min-width: 0; align-items: center; gap: 7px; text-overflow: ellipsis; white-space: nowrap; }
.oh-game-runtime-state > i { width: 6px; height: 6px; flex: none; border-radius: 50%; background: var(--dsw-alias-state-success-primary, #45b96f); }
.oh-game-preview-shell[data-state="loading"] .oh-game-runtime-state > i { background: rgb(255 255 255 / 42%); box-shadow: none; }
.oh-game-preview-shell[data-state="building"] .oh-game-runtime-state > i { background: var(--game-warning); }
.oh-game-preview-shell[data-state="error"] .oh-game-runtime-state > i { background: var(--game-danger); }
.oh-game-preview-status > div { display: flex; flex: none; gap: 6px; }
.oh-game-preview-status button {
  min-height: 36px;
  border: 1px solid rgb(255 255 255 / 14%);
  border-radius: 6px;
  color: rgb(255 255 255 / 84%);
  background: rgb(255 255 255 / 5%);
  padding: 3px 8px;
  cursor: pointer;
  font: inherit;
}
.oh-game-preview-status button:hover { background: rgb(255 255 255 / 11%); }
.oh-game-reload { display: inline-flex; align-items: center; gap: 5px; }
.oh-game-reload b { font: inherit; font-weight: 500; }
.oh-game-preview-shell iframe { width: 100%; height: 100%; min-width: 0; min-height: 0; border: 0; background: var(--game-stage); }
.oh-game-focus-hint { flex: none; margin-left: auto; color: rgb(255 255 255 / 52%); font-size: 10px; white-space: nowrap; }
.oh-game-focus-hint[data-focused] { color: var(--game-accent); }
.oh-game-studio[data-oh-game-narrow] .oh-game-focus-hint { display: none; }

.oh-game-preview-empty,
.oh-game-design-empty {
  display: grid;
  max-width: 560px;
  margin: auto;
  padding: 36px;
  place-items: center;
  gap: 8px;
  color: var(--os-muted);
  text-align: center;
  line-height: 1.65;
}
.oh-game-preview-empty { width: 100%; max-width: none; min-height: 0; flex: 1; box-sizing: border-box; align-content: center; color: rgb(244 248 240 / 70%); background: var(--game-stage); }
.oh-game-preview-empty > span { color: var(--game-accent); font-size: 30px; }
.oh-game-preview-empty strong,
.oh-game-design-empty strong { color: inherit; font-size: 15px; }
.oh-game-preview-empty p,
.oh-game-design-empty p { margin: 0; }
.oh-game-preview-empty code,
.oh-game-design-empty code { font: 11px/1.5 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
.oh-game-prompt-example { display: grid; max-width: 560px; gap: 4px; margin-top: 8px; padding: 10px 12px; border: 1px solid rgb(255 255 255 / 12%); border-radius: 8px; text-align: left; }
.oh-game-prompt-example span { color: var(--game-accent); font-size: 10px; font-weight: 600; }
.oh-game-prompt-example q { color: rgb(244 248 240 / 72%); quotes: none; font-size: 11px; }

.oh-game-source { box-sizing: border-box; min-height: 0; flex: 1; overflow: auto; margin: 0; padding: 18px 22px 48px; color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-markdown-code-block); white-space: pre-wrap; overflow-wrap: anywhere; font: 12px/1.65 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }

.oh-game-mobile-switcher { display: none; }

@keyframes oh-game-build-line { 50% { border-top-color: var(--game-accent); } }

.oh-story-tree {
  grid-column: 1;
  overflow: auto;
  padding: 14px 10px 24px;
  border-right: 1px solid var(--os-border);
  background: var(--dsw-specific-sidebar-fill);
}

.oh-story-editor {
  display: flex;
  grid-column: 2;
  overflow: hidden;
  flex-direction: column;
}

.oh-story-brand,
.oh-story-editor header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.oh-story-brand { min-height: 28px; gap: 4px; padding: 0 2px 8px 4px; font-size: 13px; font-weight: 500; white-space: nowrap; }
.oh-story-brand-cluster { display: flex; min-width: 0; align-items: center; gap: 5px; }
.oh-story-brand-cluster strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font: inherit; }
.oh-story-kind { flex: none; padding: 1px 6px; border-radius: 5px; color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-button-ghost-active-fill); font-size: 11px; line-height: 16px; font-weight: 500; }

.oh-story-brand button,
.oh-story-save {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 999px;
  color: var(--dsw-alias-label-secondary);
  background: var(--dsw-alias-bg-base);
  padding: 3px 9px;
  cursor: pointer;
  font: inherit;
}

.oh-story-brand button { display: grid; width: 28px; height: 28px; place-items: center; border: 0; padding: 0; background: transparent; font-size: 16px; }
.oh-story-brand button:hover,
.oh-story-save:hover:not(:disabled) { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-interactive-bg-hover); }
.oh-story-brand button:focus-visible,
.oh-story-save:focus-visible,
.oh-story-mode-tabs button:focus-visible,
.oh-story-editor-tabs button:focus-visible,
.oh-story-tree nav button:focus-visible { outline: 2px solid var(--dsw-alias-state-business-primary); outline-offset: -2px; }
.oh-story-save:disabled { opacity: .48; cursor: default; }

.oh-story-brand-actions { display: flex; flex: none; align-items: center; gap: 2px; }

.oh-workbench-cluster { display: flex; min-width: 0; align-items: center; gap: 6px; }
.oh-workbench-collapse {
  display: grid;
  width: 28px;
  height: 28px;
  flex: none;
  place-items: center;
  border: 0;
  border-radius: 5px;
  color: var(--os-muted);
  background: transparent;
  padding: 0;
  cursor: pointer;
  font: inherit;
  font-size: 16px;
}
.oh-workbench-collapse:hover { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-interactive-bg-hover); }
.oh-workbench-collapse:focus-visible { outline: 2px solid var(--dsw-alias-state-business-primary); outline-offset: -2px; }

.oh-story-workbench-nav { display: flex; flex-wrap: wrap; align-items: center; gap: 4px; margin: 0 4px 8px; }
.oh-story-workbench-nav .oh-story-mode-tabs { flex: 1 0 100%; min-width: 0; margin: 0; box-sizing: border-box; }
.oh-story-workbench-nav .oh-workbench-settings-toggle { margin-left: auto; }
.oh-workbench-settings-toggle { flex: none; width: 28px; height: 28px; padding: 0; border: 0; border-radius: 5px; color: var(--os-muted); background: transparent; cursor: pointer; font: 16px var(--dsw-font-family); }
.oh-workbench-settings-toggle:hover { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-interactive-bg-hover); }
.oh-workbench-settings-toggle:focus-visible,
.oh-workbench-settings button:focus-visible,
.oh-workbench-settings input:focus-visible { outline: 2px solid var(--dsw-alias-state-business-primary); outline-offset: 2px; }
.oh-workbench-settings { box-sizing: border-box; width: min(440px, calc(100vw - 32px)); max-height: calc(100dvh - 32px); overflow: auto; padding: 20px; border: 1px solid var(--os-border); border-radius: 10px; color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-base); font: 13px/1.6 var(--dsw-font-family); }
.oh-workbench-settings::backdrop { background: rgb(0 0 0 / 30%); }
.oh-workbench-settings > header { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.oh-workbench-settings h2 { margin: 0; font-size: 16px; }
.oh-workbench-settings h3 { margin: 20px 0 8px; font-size: 13px; }
.oh-workbench-settings p { margin: 8px 0; color: var(--os-muted); }
.oh-workbench-settings fieldset { min-width: 0; margin: 16px 0 0; padding: 0; border: 0; }
.oh-workbench-settings legend { font-weight: 500; }
.oh-workbench-settings-options { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 12px 0; }
.oh-workbench-settings-options label { display: flex; align-items: center; gap: 8px; padding: 8px; border: 1px solid var(--os-border); border-radius: 6px; cursor: pointer; }
.oh-workbench-settings input { accent-color: var(--dsw-alias-state-business-primary); }
.oh-workbench-settings button { padding: 4px 10px; border: 1px solid var(--os-border); border-radius: 5px; color: inherit; background: var(--dsw-alias-bg-layer-1); cursor: pointer; font: inherit; }
.oh-workbench-settings > header > button { border: 0; background: transparent; font-size: 18px; }

.oh-story-mode-tabs { display: flex; margin: 0 4px 8px; padding: 2px; border: 1px solid var(--os-border); border-radius: 7px; background: var(--dsw-alias-bg-layer-1); }

.oh-story-mode-tabs button,
.oh-story-editor-tabs button {
  position: relative;
  min-height: 24px;
  flex: 1;
  border: 0;
  color: var(--os-muted);
  background: transparent;
  border-radius: 5px;
  cursor: pointer;
  font: inherit;
  font-size: 11px;
}

.oh-story-mode-tabs button:hover,
.oh-story-editor-tabs button:hover { color: var(--dsw-alias-label-primary); }
.oh-story-mode-tabs button[aria-selected="true"],
.oh-story-editor-tabs button[aria-selected="true"] { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-base); box-shadow: 0 1px 2px rgb(0 0 0 / 8%); font-weight: 500; }

.oh-story-file-group,
.oh-story-file-folder { margin: 0; }
.oh-story-file-group > summary,
.oh-story-file-folder > summary {
  display: flex;
  align-items: center;
  gap: 5px;
  min-height: 26px;
  padding: 0 7px;
  border-radius: 6px;
  color: var(--os-muted);
  cursor: pointer;
  list-style: none;
  font-size: 11px;
  font-weight: 600;
}
.oh-story-file-folder > summary { padding-left: min(calc(7px + var(--oh-story-indent, 0px)), 49px); }
.oh-story-file-group > summary { margin-top: 3px; }
.oh-story-file-group > summary::-webkit-details-marker,
.oh-story-file-folder > summary::-webkit-details-marker { display: none; }
.oh-story-file-group > summary::before,
.oh-story-file-folder > summary::before { width: 8px; content: "\u203A"; transform: rotate(0); transition: transform .12s ease; }
.oh-story-file-group[open] > summary::before,
.oh-story-file-folder[open] > summary::before { transform: rotate(90deg); }
.oh-story-file-group > summary:hover,
.oh-story-file-folder > summary:hover { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-interactive-bg-hover); }
.oh-story-file-group > summary span,
.oh-story-file-folder > summary span { margin-left: auto; color: var(--dsw-alias-label-secondary); font-weight: 400; }

.oh-story-tree nav button {
  display: block;
  width: 100%;
  overflow: hidden;
  padding: 6px 8px 6px min(calc(14px + var(--oh-story-indent, 0px)), 56px);
  border: 0;
  border-radius: 6px;
  color: inherit;
  background: transparent;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  font: inherit;
  font-size: 12px;
}
.oh-story-tree nav button:hover { background: var(--dsw-alias-interactive-bg-hover); }
.oh-story-tree nav button[aria-current="page"] { background: var(--dsw-alias-button-ghost-active-fill); color: var(--dsw-alias-label-primary); }
.oh-story-tree nav button[data-agent-target] { box-shadow: inset 2px 0 var(--dsw-alias-state-business-primary); }

.oh-story-editor > header {
  min-height: 44px;
  flex: none;
  padding: 0 14px;
  border-bottom: 1px solid var(--os-border);
}

.oh-story-editor-path {
  overflow: hidden;
  min-width: 0;
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  color: var(--os-muted);
}
.oh-story-editor-path > span { overflow: hidden; display: block; text-overflow: ellipsis; }
.oh-story-editor-path > strong { display: none; overflow: hidden; text-overflow: ellipsis; font: inherit; }

.oh-story-editor-actions { display: flex; flex: none; align-items: center; gap: 8px; }
.oh-story-editor-tabs {
  display: flex;
  padding: 2px;
  border: 1px solid var(--os-border);
  border-radius: 7px;
  background: var(--dsw-alias-bg-layer-1);
}
.oh-story-editor-tabs button { min-height: 24px; padding: 0 9px; border-radius: 5px; font-size: 11px; }
.oh-story-save { min-height: 28px; }

.oh-story-editor textarea {
  box-sizing: border-box;
  width: 100%;
  min-height: 0;
  flex: 1;
  resize: none;
  border: 0;
  outline: 0;
  padding: clamp(20px, 6%, 48px) clamp(22px, 10%, 84px) 48px;
  color: var(--dsw-alias-label-primary);
  background: transparent;
  font: 16px/1.9 ui-serif, "Songti SC", "STSong", Georgia, serif;
}
.oh-story-editor textarea[data-format="structured"] {
  tab-size: 2;
  font: 13px/1.65 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.oh-story-markdown {
  box-sizing: border-box;
  width: 100%;
  min-height: 0;
  flex: 1;
  overflow: auto;
  padding: clamp(24px, 8%, 56px) clamp(24px, 10%, 92px) 64px;
  color: var(--dsw-alias-label-primary);
  font: 16px/1.85 ui-serif, "Songti SC", "STSong", Georgia, serif;
  overflow-wrap: anywhere;
}
.oh-story-markdown > :first-child { margin-top: 0; }
.oh-story-markdown > :last-child { margin-bottom: 0; }
.oh-story-markdown h1,
.oh-story-markdown h2,
.oh-story-markdown h3,
.oh-story-markdown h4,
.oh-story-markdown h5,
.oh-story-markdown h6 { margin: 1.45em 0 .6em; font-family: var(--dsw-font-family); line-height: 1.35; letter-spacing: -.01em; }
.oh-story-markdown h1 { font-size: 1.75em; }
.oh-story-markdown h2 { padding-bottom: .35em; border-bottom: 1px solid var(--os-border); font-size: 1.35em; }
.oh-story-markdown h3 { font-size: 1.15em; }
.oh-story-markdown p { margin: .75em 0; }
.oh-story-markdown ul,
.oh-story-markdown ol { margin: .75em 0; padding-left: 1.6em; }
.oh-story-markdown li { margin: .28em 0; }
.oh-story-markdown .oh-story-task-item { list-style: none; margin-left: -1.35em; }
.oh-story-task-item input { margin: 0 .55em 0 0; accent-color: var(--dsw-alias-state-business-primary); }
.oh-story-markdown blockquote { margin: 1em 0; padding: .1em 1em; border-left: 3px solid var(--dsw-alias-state-business-primary); color: var(--dsw-alias-label-secondary); }
/* DSH gives inline code its own alias; the block fill is a different surface. */
.oh-story-markdown code { padding: .15em .4em; border-radius: 4px; background: var(--dsw-alias-markdown-inline-code); font: .86em/1.6 ui-monospace, SFMono-Regular, Menlo, monospace; }
.oh-story-markdown pre { overflow: auto; margin: 1em 0; padding: 14px 16px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 10px; background: var(--dsw-alias-markdown-code-block); }
.oh-story-markdown pre code { padding: 0; background: transparent; }
.oh-story-markdown a { color: var(--dsw-alias-state-business-primary); text-decoration-thickness: 1px; text-underline-offset: 3px; }
.oh-story-markdown del { color: var(--os-muted); }
.oh-story-markdown-table { overflow-x: auto; margin: 1em 0; border: 1px solid var(--os-border); border-radius: 10px; }
.oh-story-markdown table { width: 100%; border-collapse: collapse; font-family: ui-sans-serif, system-ui, "PingFang SC", sans-serif; font-size: 13px; line-height: 1.55; }
.oh-story-markdown th,
.oh-story-markdown td { min-width: 96px; padding: 9px 12px; border-right: 1px solid var(--os-border); border-bottom: 1px solid var(--os-border); vertical-align: top; }
.oh-story-markdown th:last-child,
.oh-story-markdown td:last-child { border-right: 0; }
.oh-story-markdown tbody tr:last-child td { border-bottom: 0; }
.oh-story-markdown th { background: var(--dsw-alias-bg-layer-1); font-weight: 600; }
.oh-story-markdown hr { margin: 2em 0; border: 0; border-top: 1px solid var(--os-border); }
.oh-story-markdown-empty { margin: auto; color: var(--os-muted); font-size: 13px; }

.oh-story-jsonl {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  min-height: 0;
  flex: 1;
  overflow: hidden;
  flex-direction: column;
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-base);
}
.oh-story-jsonl-summary { display: flex; min-height: 42px; flex: none; align-items: center; gap: 10px; padding: 0 18px; border-bottom: 1px solid var(--os-border); font-size: 12px; }
.oh-story-jsonl-summary strong { font-weight: 600; }
.oh-story-jsonl-summary span { color: var(--os-muted); }
.oh-story-jsonl-records { overflow: auto; padding: 14px 18px 36px; }
.oh-story-jsonl details,
.oh-story-jsonl-error { overflow: hidden; margin-bottom: 10px; border: 1px solid var(--os-border); border-radius: 10px; background: var(--dsw-alias-bg-layer-1); }
.oh-story-jsonl summary { display: flex; min-height: 42px; align-items: center; gap: 9px; padding: 0 12px; cursor: pointer; list-style: none; font: 12px/1.4 var(--dsw-font-family); }
.oh-story-jsonl summary::-webkit-details-marker { display: none; }
.oh-story-jsonl summary::before { content: "\u203A"; color: var(--os-muted); font-size: 16px; transition: transform .12s ease; }
.oh-story-jsonl details[open] summary::before { transform: rotate(90deg); }
.oh-story-jsonl summary > span { flex: none; color: var(--os-muted); font-variant-numeric: tabular-nums; }
.oh-story-jsonl summary > strong { overflow: hidden; min-width: 80px; flex: 1; text-overflow: ellipsis; white-space: nowrap; font-weight: 600; }
.oh-story-jsonl summary > code,
.oh-story-jsonl summary > em { flex: none; padding: 2px 6px; border-radius: 5px; background: var(--dsw-alias-button-ghost-active-fill); color: var(--dsw-alias-label-secondary); font: 11px/1.35 ui-monospace, SFMono-Regular, Menlo, monospace; font-style: normal; }
.oh-story-jsonl pre { overflow: auto; max-height: 520px; margin: 0; padding: 14px 16px; border-top: 1px solid var(--os-border); background: var(--dsw-alias-markdown-code-block); color: var(--dsw-alias-label-secondary); white-space: pre-wrap; overflow-wrap: anywhere; font: 12px/1.6 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
.oh-story-jsonl-error { display: grid; gap: 5px; padding: 12px; border-color: var(--dsw-alias-state-error-primary); font-size: 12px; }
.oh-story-jsonl-error > strong { color: var(--dsw-alias-state-error-primary); }
.oh-story-jsonl-error > span { color: var(--os-muted); }
.oh-story-jsonl-error pre { margin: 3px -12px -12px; }

.oh-story-stream,
.oh-story-conflict,
.oh-story-warning {
  flex: none;
  padding: 7px 12px;
  border-bottom: 1px solid var(--os-border);
  font-size: 11px;
  line-height: 1.4;
}

.oh-story-stream { color: var(--dsw-alias-state-business-primary); background: var(--dsw-alias-button-ghost-active-fill); }
.oh-story-stream[data-stage="streaming"] { animation: oh-story-pulse 1.2s ease-in-out infinite alternate; }
.oh-story-conflict { color: var(--dsw-alias-state-warn-label); background: var(--dsw-specific-tip); }
.oh-story-conflict > div { display: flex; gap: 6px; margin-top: 6px; }
.oh-story-conflict button,
.oh-story-empty button {
  border: 1px solid var(--os-border);
  border-radius: 6px;
  color: inherit;
  background: var(--dsw-alias-bg-base);
  padding: 3px 8px;
  cursor: pointer;
  font: inherit;
}
.oh-story-warning { color: var(--dsw-alias-state-warn-label); background: var(--dsw-specific-tip); }

@keyframes oh-story-pulse { to { opacity: .62; } }
@media (prefers-reduced-motion: reduce) { .oh-story-stream[data-stage="streaming"] { animation: none; } }

.oh-story-empty { margin: auto; max-width: 480px; padding: 30px; color: var(--os-muted); line-height: 1.7; text-align: center; }
.oh-story-error { margin: 8px; padding: 8px 10px; border-radius: 8px; color: var(--dsw-alias-state-error-primary); background: var(--dsw-specific-tip); font-size: 12px; }

/* Short-drama production views are projections of the creator Markdown and
   DSH Session state. They intentionally use only DSH semantic tokens. */
.oh-story-production { min-height: 0; flex: 1; overflow: auto; background: var(--dsw-alias-bg-base); font: 12px/1.5 var(--dsw-font-family); }
.oh-story-production button,
.oh-story-production select { border: 1px solid var(--os-border); border-radius: 6px; color: inherit; background: var(--dsw-alias-bg-base); padding: 4px 8px; cursor: pointer; font: inherit; }
.oh-story-production button:hover:not(:disabled) { background: var(--dsw-alias-interactive-bg-hover); }
.oh-story-production button:disabled { opacity: .45; cursor: default; }
.oh-story-production button:focus-visible,
.oh-story-canvas article:focus-visible { outline: 2px solid var(--dsw-alias-state-business-primary); outline-offset: 2px; }
.oh-story-production-bar,
.oh-story-production-notice,
.oh-story-production-actions,
.oh-story-sequence-summary { display: flex; align-items: center; gap: 8px; }
.oh-story-production-bar { position: sticky; z-index: 5; top: 0; justify-content: space-between; min-height: 44px; box-sizing: border-box; padding: 6px 12px; border-bottom: 1px solid var(--os-border); background: color-mix(in srgb, var(--dsw-alias-bg-base) 94%, transparent); backdrop-filter: blur(12px); }
.oh-story-production-tabs { display: flex; align-self: stretch; gap: 16px; }
.oh-story-production-tabs button { position: relative; border: 0; border-radius: 0; padding: 0; background: transparent; color: var(--os-muted); }
.oh-story-production-tabs button[aria-selected="true"] { color: var(--dsw-alias-label-primary); }
.oh-story-production-tabs button[aria-selected="true"]::after { position: absolute; right: 0; bottom: -6px; left: 0; height: 2px; border-radius: 2px; background: var(--dsw-alias-state-business-primary); content: ""; }
.oh-story-production-meta { display: flex; align-items: center; gap: 8px; }
.oh-story-production-meta > button { padding-block: 2px; color: var(--os-muted); }
.oh-story-production-summary { color: var(--os-muted); white-space: nowrap; }
.oh-story-production-notice { justify-content: space-between; margin: 8px 12px 0; padding: 7px 9px; border: 1px solid var(--os-border); border-radius: 7px; color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-bg-layer-1); }
.oh-story-production-notice button { border: 0; background: transparent; }
.oh-story-shot-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); align-items: start; gap: 12px; }
.oh-story-shot-card,
.oh-story-asset-card,
.oh-story-task-board > article { min-width: 0; overflow: hidden; border: 1px solid var(--os-border); border-radius: 10px; background: var(--dsw-alias-bg-layer-1); }
.oh-story-shot-card:focus-visible,
.oh-story-asset-card:focus-visible { outline: 2px solid var(--dsw-alias-state-business-primary); outline-offset: 2px; }
.oh-story-shot-card[data-selected],
.oh-story-asset-card[data-selected] { border-color: var(--dsw-alias-state-business-primary); background: color-mix(in srgb, var(--dsw-alias-state-business-primary) 4%, var(--dsw-alias-bg-layer-1)); }
.oh-story-media-preview { display: block; width: 100%; height: 168px; border-radius: 7px; background: var(--dsw-alias-bg-base); object-fit: contain; }
.oh-story-media-document { display: grid; min-height: 0; flex: 1; overflow: auto; place-items: center; padding: 24px; }
.oh-story-media-document img,
.oh-story-media-document video { display: block; max-width: 100%; max-height: 100%; object-fit: contain; }
.oh-story-media-document audio { width: min(520px, 100%); }
.oh-story-version-strip { display: flex; gap: 5px; overflow-x: auto; margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--os-border); }
.oh-story-version-strip > button { position: relative; width: 64px; min-width: 64px; padding: 2px; }
.oh-story-version-strip > button[data-selected] { border-color: var(--dsw-alias-state-business-primary); }
.oh-story-version-strip .oh-story-media-preview { height: 72px; }
.oh-story-version-strip span { position: absolute; right: 3px; bottom: 3px; padding: 0 3px; border-radius: 3px; background: var(--dsw-alias-bg-base); font-size: 10px; }
.oh-story-media-library { margin: 0 12px 14px; padding-top: 12px; border-top: 1px solid var(--os-border); }
.oh-story-media-library > header { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 10px; }
.oh-story-media-library > header > div { display: flex; align-items: center; gap: 7px; }
.oh-story-media-library > header span { color: var(--os-muted); }
.oh-story-media-library input { width: 180px; box-sizing: border-box; border: 1px solid var(--os-border); border-radius: 6px; padding: 5px 8px; color: inherit; background: var(--dsw-alias-bg-base); font: inherit; }
.oh-story-media-library > .oh-story-projection-note { margin-bottom: 10px; }
.oh-story-media-library-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 8px; }
.oh-story-media-library-grid > article { display: flex; min-width: 0; flex-direction: column; gap: 5px; padding: 7px; border: 1px solid var(--os-border); border-radius: 8px; background: var(--dsw-alias-bg-layer-1); }
.oh-story-media-library-grid .oh-story-media-preview { height: 116px; }
.oh-story-media-library-grid > article > span { overflow: hidden; color: var(--os-muted); font-size: 10px; text-overflow: ellipsis; white-space: nowrap; }
.oh-story-media-library-grid footer { display: flex; gap: 4px; margin-top: auto; }
.oh-story-media-library-grid footer button { min-width: 0; flex: 1; padding-inline: 4px; }
.oh-story-media-library-grid footer button[aria-pressed="true"] { color: var(--dsw-alias-state-business-primary); border-color: var(--dsw-alias-state-business-primary); }
.oh-story-task-board { display: grid; gap: 10px; padding: 12px; }
.oh-story-task-board > article { padding: 11px; }
.oh-story-task-board > article[data-status="dispatched_unknown"] { border-color: var(--dsw-alias-state-warn-label); }
.oh-story-task-board > article[data-status="dispatched_unknown"] .oh-story-error { color: var(--dsw-alias-state-warn-label); background: var(--dsw-specific-tip); }
.oh-story-task-board article > header strong { min-width: 0; flex: 1; overflow: hidden; text-overflow: ellipsis; }
.oh-story-task-board article > header span { padding: 1px 5px; border-radius: 5px; color: var(--os-muted); background: var(--dsw-alias-button-ghost-active-fill); }
.oh-story-task-progress { height: 3px; overflow: hidden; margin-top: 8px; border-radius: 3px; background: var(--os-border); }
.oh-story-task-progress i { display: block; height: 100%; background: var(--dsw-alias-state-business-primary); transition: width .2s ease; }
.oh-story-task-board details { margin-top: 8px; color: var(--os-muted); }
.oh-story-task-board details summary { cursor: pointer; }
.oh-story-task-board details p { max-height: 120px; overflow: auto; margin: 6px 0; padding: 8px; border-radius: 6px; background: var(--dsw-alias-bg-base); white-space: pre-wrap; }
.oh-story-task-board footer { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 5px; margin-top: 8px; }
.oh-story-projection-note { padding: 7px 10px; border: 1px solid var(--os-border); border-radius: 7px; color: var(--os-muted); background: var(--dsw-alias-bg-layer-1); }
/* Shared rhythm for every production tab: 12px gutters, 10\u201312px radii, mono for IDs,
   one primary action per surface, status as quiet dots rather than red walls. */
.oh-story-production { --os-mono: 10.5px/1.5 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; --os-accent: var(--dsw-alias-state-business-primary); --os-accent-soft: color-mix(in srgb, var(--dsw-alias-state-business-primary) 9%, transparent); }
.oh-story-production-tabs button:hover:not(:disabled) { color: var(--dsw-alias-label-primary); background: transparent; }

/* Status row: one pill per concern; the detail opens underneath on demand. */
.oh-story-production-status { margin: 10px 12px 0; }
.oh-story-status-pills { display: flex; flex-wrap: wrap; gap: 6px; }
.oh-story-production .oh-story-status-pill { display: inline-flex; min-height: 26px; align-items: center; gap: 6px; padding: 0 10px 0 9px; border-radius: 999px; color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-bg-layer-1); white-space: nowrap; }
.oh-story-production .oh-story-status-pill[aria-expanded="true"] { border-color: var(--dsw-alias-border-l2); color: var(--dsw-alias-label-primary); }
.oh-story-status-pill > i { width: 6px; height: 6px; flex: none; border-radius: 50%; background: var(--os-muted); }
.oh-story-status-pill[data-tone="ready"] > i { background: var(--dsw-alias-state-success-primary); }
.oh-story-status-pill[data-tone="partial"] > i,
.oh-story-status-pill[data-tone="warning"] > i { background: var(--dsw-alias-state-warn-label); }
.oh-story-status-pill[data-tone="error"] > i { background: var(--dsw-alias-state-error-primary); }
.oh-story-status-pill[data-tone="idle"] > i { background: transparent; box-shadow: inset 0 0 0 1.5px var(--os-muted); }
.oh-story-status-pill em { overflow: hidden; min-width: 0; color: var(--os-muted); font-style: normal; text-overflow: ellipsis; }
.oh-story-production .oh-story-status-pill { max-width: 100%; overflow: hidden; }
.oh-story-status-pill > b { width: 4px; height: 4px; margin-left: 1px; border-right: 1.5px solid currentColor; border-bottom: 1.5px solid currentColor; opacity: .5; transform: translateY(-1px) rotate(45deg); transition: transform .15s ease; }
.oh-story-status-pill[aria-expanded="true"] > b { transform: translateY(1px) rotate(-135deg); }
.oh-story-status-panel { margin-top: 8px; padding: 8px 12px 10px; border: 1px solid var(--os-border); border-radius: 10px; color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-bg-layer-1); }
.oh-story-provider-list { display: grid; margin: 0; padding: 0; list-style: none; }
.oh-story-provider-list li { display: grid; grid-template-columns: 6px 30px minmax(84px, max-content) minmax(0, 1fr); align-items: baseline; gap: 8px; padding: 6px 0; border-bottom: 1px solid var(--os-border); }
.oh-story-provider-list li:last-child { border-bottom: 0; }
.oh-story-provider-list i { width: 6px; height: 6px; align-self: start; margin-top: 6px; border-radius: 50%; box-shadow: inset 0 0 0 1.5px var(--os-muted); }
.oh-story-provider-list li[data-ready] i { background: var(--dsw-alias-state-success-primary); box-shadow: none; }
.oh-story-provider-list span { color: var(--os-muted); font-size: 11px; }
.oh-story-provider-list strong { color: var(--dsw-alias-label-primary); font-weight: 500; white-space: nowrap; }
.oh-story-provider-list small { display: flex; min-width: 0; flex-wrap: wrap; align-items: baseline; gap: 4px; color: var(--os-muted); font-size: 11px; }
.oh-story-provider-list li[data-ready] small { color: var(--dsw-alias-state-success-primary); }
.oh-story-provider-list li[data-error] i { background: var(--dsw-alias-state-error-primary); box-shadow: none; }
.oh-story-provider-list li[data-error] small { color: var(--dsw-alias-state-error-primary); }
.oh-story-shot-card > .oh-story-media-preview,
.oh-story-asset-media > .oh-story-media-preview { background: var(--dsw-alias-button-ghost-active-fill); }
.oh-story-status-panel code { max-width: 100%; overflow: hidden; padding: 0 5px; border-radius: 4px; color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-button-ghost-active-fill); font: var(--os-mono); text-overflow: ellipsis; white-space: nowrap; }
.oh-story-status-panel > p { margin: 8px 0 0; color: var(--os-muted); line-height: 1.6; }
.oh-story-status-panel > footer { display: flex; min-width: 0; align-items: center; gap: 8px; margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--os-border); color: var(--os-muted); font-size: 11px; }
.oh-story-status-panel > footer > span { flex: none; }
.oh-story-status-panel > footer code { min-width: 0; flex: 1; }
.oh-story-status-panel > footer button { flex: none; padding: 1px 8px; }
.oh-story-production-diagnostics ul { display: grid; margin: 0; padding: 0; list-style: none; }
.oh-story-production-diagnostics li { display: grid; grid-template-columns: minmax(92px, max-content) minmax(0, 1fr); align-items: baseline; gap: 10px; padding: 5px 0; border-bottom: 1px solid var(--os-border); }
.oh-story-production-diagnostics li:last-child { border-bottom: 0; }
.oh-story-production .oh-story-production-diagnostics li button { border: 0; padding: 0; color: var(--os-accent); background: transparent; font: var(--os-mono); text-align: left; white-space: nowrap; }
.oh-story-production-diagnostics li button span { color: var(--os-muted); }
.oh-story-production-diagnostics li[data-severity="error"] > span { color: var(--dsw-alias-state-error-primary); }
.oh-story-production-diagnostics p { margin: 6px 0 0; color: var(--os-muted); }

/* Shot board */
.oh-story-shot-board { padding: 12px; }
.oh-story-production-actions { justify-content: flex-end; gap: 6px; margin-bottom: 10px; }
.oh-story-production .oh-story-production-actions button:last-child { border-color: color-mix(in srgb, var(--os-accent) 40%, var(--os-border)); color: var(--os-accent); background: var(--os-accent-soft); }
.oh-story-shot-card { padding: 8px 8px 10px; border-radius: 12px; cursor: pointer; transition: border-color .15s ease, background-color .15s ease, box-shadow .15s ease; }
.oh-story-shot-card:hover { border-color: var(--dsw-alias-border-l2); box-shadow: 0 2px 10px rgb(0 0 0 / 5%); }
.oh-story-shot-card > .oh-story-media-preview,
.oh-story-shot-placeholder { height: 156px; border-radius: 8px; }
.oh-story-shot-placeholder { display: grid; box-sizing: border-box; place-content: center; gap: 2px; border: 1px dashed var(--os-border); color: var(--os-muted); background: repeating-linear-gradient(135deg, transparent 0 9px, color-mix(in srgb, var(--os-border) 35%, transparent) 9px 10px); text-align: center; }
.oh-story-shot-placeholder strong { color: var(--dsw-alias-label-secondary); font: 600 20px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .04em; }
.oh-story-shot-placeholder span { font-size: 11px; }
.oh-story-shot-card > header,
.oh-story-task-board article > header { display: flex; min-height: 0; align-items: center; gap: 8px; padding: 0; border: 0; }
.oh-story-shot-card > header { margin: 9px 2px 0; }
.oh-story-production .oh-story-shot-card > header > button { overflow: hidden; min-width: 0; flex: 1; border: 0; padding: 0; color: var(--os-muted); background: transparent; font: var(--os-mono); text-align: left; text-overflow: ellipsis; white-space: nowrap; }
.oh-story-production .oh-story-shot-card > header > button:hover { color: var(--os-accent); background: transparent; }
.oh-story-shot-card > header > span { padding: 0 6px; border-radius: 999px; color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-button-ghost-active-fill); font: var(--os-mono); }
.oh-story-shot-card h3,
.oh-story-asset-card h3 { margin: 4px 2px 2px; color: var(--dsw-alias-label-primary); font-size: 13.5px; font-weight: 600; line-height: 1.4; }
.oh-story-shot-card > p,
.oh-story-task-board article > p { margin: 0 2px; color: var(--os-muted); }
.oh-story-shot-card dl { display: grid; grid-template-columns: 18px minmax(0, 1fr); gap: 4px 6px; margin: 8px 2px; }
.oh-story-shot-card dt { width: 16px; height: 16px; margin-top: 1px; border-radius: 4px; color: var(--os-accent); background: var(--os-accent-soft); font-size: 10px; line-height: 16px; text-align: center; }
.oh-story-shot-card dd { min-width: 0; margin: 0; color: var(--dsw-alias-label-secondary); overflow-wrap: anywhere; }
.oh-story-shot-status,
.oh-story-reference-links { display: flex; flex-wrap: wrap; gap: 4px; margin: 6px 2px 0; }
.oh-story-shot-status span { display: inline-flex; align-items: center; gap: 3px; padding: 0 7px; border-radius: 999px; color: var(--os-muted); background: var(--dsw-alias-button-ghost-active-fill); font-size: 11px; line-height: 20px; }
.oh-story-shot-status span[data-ready="true"] { color: var(--dsw-alias-state-success-primary); background: color-mix(in srgb, var(--dsw-alias-state-success-primary) 10%, transparent); }
.oh-story-shot-status span > i { font-size: 10px; font-style: normal; }
.oh-story-shot-status > span:last-child:not([data-ready]) { margin-left: auto; padding: 0; background: transparent; font-variant-numeric: tabular-nums; }
.oh-story-production .oh-story-reference-links button { max-width: 100%; overflow: hidden; padding: 0 6px; border-color: var(--os-border); border-radius: 5px; color: var(--dsw-alias-label-secondary); background: transparent; font: var(--os-mono); line-height: 18px; text-overflow: ellipsis; white-space: nowrap; }
.oh-story-production .oh-story-reference-links button:hover:not(:disabled) { border-color: var(--os-accent); color: var(--os-accent); background: var(--os-accent-soft); }
.oh-story-card-actions { display: flex; gap: 6px; margin: 10px 2px 0; padding-top: 10px; border-top: 1px solid var(--os-border); }
.oh-story-card-actions button { min-width: 0; flex: 1; padding-block: 5px; }
.oh-story-production .oh-story-card-actions button:last-child { border-color: color-mix(in srgb, var(--os-accent) 40%, var(--os-border)); color: var(--os-accent); background: var(--os-accent-soft); }

/* Asset board */
.oh-story-asset-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; padding: 12px; }
.oh-story-asset-card { display: flex; flex-direction: column; padding: 8px 8px 10px; border-radius: 12px; }
.oh-story-asset-media { position: relative; }
.oh-story-asset-media > .oh-story-media-preview,
.oh-story-asset-placeholder { height: 136px; border-radius: 8px; }
.oh-story-asset-placeholder { display: grid; place-items: center; color: color-mix(in srgb, var(--os-accent) 55%, var(--os-muted)); background: linear-gradient(160deg, var(--os-accent-soft), var(--dsw-alias-button-ghost-active-fill)); font-size: 34px; font-weight: 300; }
.oh-story-asset-media[data-kind="scene"] .oh-story-asset-placeholder { color: color-mix(in srgb, var(--dsw-alias-state-success-primary) 60%, var(--os-muted)); background: linear-gradient(160deg, color-mix(in srgb, var(--dsw-alias-state-success-primary) 9%, transparent), var(--dsw-alias-button-ghost-active-fill)); }
.oh-story-asset-media[data-kind="prop"] .oh-story-asset-placeholder { color: color-mix(in srgb, var(--dsw-alias-state-warn-label) 65%, var(--os-muted)); background: linear-gradient(160deg, color-mix(in srgb, var(--dsw-alias-state-warn-label) 9%, transparent), var(--dsw-alias-button-ghost-active-fill)); }
.oh-story-asset-media > small { position: absolute; top: 8px; left: 8px; padding: 0 8px; border: 1px solid var(--os-border); border-radius: 999px; color: var(--dsw-alias-label-secondary); background: color-mix(in srgb, var(--dsw-alias-bg-base) 86%, transparent); backdrop-filter: blur(6px); font-size: 10.5px; line-height: 18px; }
.oh-story-asset-head { display: flex; min-width: 0; flex-direction: column; margin-top: 9px; }
.oh-story-asset-head h3 { margin-top: 0; }
.oh-story-production .oh-story-asset-head > button { overflow: hidden; max-width: 100%; align-self: flex-start; margin-left: 2px; border: 0; padding: 0; color: var(--os-muted); background: transparent; font: var(--os-mono); text-overflow: ellipsis; white-space: nowrap; }
.oh-story-production .oh-story-asset-head > button:hover { color: var(--os-accent); background: transparent; }
.oh-story-asset-description { display: -webkit-box; overflow: hidden; margin: 6px 2px 0; color: var(--os-muted); font-size: 11.5px; line-height: 1.55; -webkit-box-orient: vertical; -webkit-line-clamp: 3; line-clamp: 3; }
.oh-story-asset-card > .oh-story-card-actions { margin-top: auto; }
.oh-story-asset-card > .oh-story-asset-description + .oh-story-card-actions { margin-top: 10px; }

/* Task board */
.oh-story-board-hint { margin: 0; color: var(--os-muted); font-size: 11.5px; line-height: 1.6; }
.oh-story-production-empty { margin: 4px 0; padding: 36px 20px; border: 1px dashed var(--os-border); border-radius: 12px; color: var(--os-muted); text-align: center; }
.oh-story-production-empty strong { display: block; margin-bottom: 4px; color: var(--dsw-alias-label-primary); font-size: 13px; font-weight: 600; }
.oh-story-production-empty p { max-width: 36em; margin: 0 auto; line-height: 1.6; }
.oh-story-production-empty button { margin-top: 12px; }
.oh-story-shot-board > .oh-story-production-empty,
.oh-story-assets > .oh-story-production-empty,
.oh-story-canvas-shell > .oh-story-production-empty { margin: 12px; }

/* Final-cut sequence */
.oh-story-sequence { padding: 12px; }
.oh-story-sequence-summary { flex-wrap: wrap; margin-bottom: 10px; }
.oh-story-sequence-summary strong { color: var(--dsw-alias-label-primary); font-size: 13px; }
.oh-story-sequence-summary span { margin-left: auto; color: var(--os-muted); }
.oh-story-production .oh-story-sequence-summary button { border-color: transparent; color: #fff; background: var(--os-accent); }
.oh-story-production .oh-story-sequence-summary button:hover:not(:disabled) { background: color-mix(in srgb, var(--os-accent) 88%, #000); }
.oh-story-sequence-issues { margin: 0 0 10px; padding: 8px 12px; border: 1px solid color-mix(in srgb, var(--dsw-alias-state-warn-label) 35%, var(--os-border)); border-radius: 10px; color: var(--dsw-alias-label-secondary); background: var(--dsw-specific-tip); list-style: none; }
.oh-story-sequence-issues li { position: relative; padding-left: 14px; line-height: 1.7; }
.oh-story-sequence-issues li::before { position: absolute; top: .72em; left: 2px; width: 5px; height: 5px; border-radius: 50%; background: var(--dsw-alias-state-warn-label); content: ""; }
.oh-story-sequence ol { display: grid; gap: 6px; margin: 0; padding: 0; list-style: none; }
.oh-story-sequence > ol > li { display: grid; min-height: 60px; grid-template-columns: 22px 64px minmax(0, 1fr) auto; align-items: center; gap: 10px; padding: 6px 8px; border: 1px solid var(--os-border); border-radius: 10px; background: var(--dsw-alias-bg-layer-1); }
.oh-story-sequence > ol > li > span { color: var(--os-muted); font: var(--os-mono); text-align: right; }
.oh-story-sequence > ol > li .oh-story-media-preview,
.oh-story-sequence-missing { width: 64px; height: 48px; border-radius: 6px; }
.oh-story-sequence > ol > li .oh-story-media-preview { object-fit: cover; }
.oh-story-sequence-missing { display: grid; box-sizing: border-box; place-items: center; border: 1px dashed color-mix(in srgb, var(--dsw-alias-state-warn-label) 50%, var(--os-border)); color: var(--dsw-alias-state-warn-label); font-size: 10.5px; }
.oh-story-sequence-main { display: grid; min-width: 0; gap: 4px; }
.oh-story-sequence-main strong { overflow: hidden; color: var(--dsw-alias-label-primary); font: 500 11.5px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace; text-overflow: ellipsis; white-space: nowrap; }
.oh-story-sequence-main select { width: 100%; min-width: 0; padding-block: 3px; }
.oh-story-sequence-move { display: grid; gap: 3px; }
.oh-story-production .oh-story-sequence-move button { width: 26px; height: 22px; padding: 0; line-height: 1; }
/* Project media library: same card language as the asset board. */
.oh-story-media-library { margin: 4px 12px 16px; padding-top: 14px; }
.oh-story-media-library > header strong { color: var(--dsw-alias-label-primary); font-size: 13px; }
.oh-story-media-library > .oh-story-projection-note { padding: 0; border: 0; background: transparent; font-size: 11.5px; line-height: 1.6; }
.oh-story-media-library-grid > article { gap: 4px; padding: 8px; border-radius: 12px; }
.oh-story-media-library-grid .oh-story-media-preview { border-radius: 8px; background: var(--dsw-alias-button-ghost-active-fill); }
.oh-story-media-library-grid > article > strong { margin-top: 4px; overflow: hidden; color: var(--dsw-alias-label-primary); font: 500 11.5px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace; text-overflow: ellipsis; white-space: nowrap; }
.oh-story-media-library-grid > article > span { font: var(--os-mono); font-size: 10px; }
.oh-story-media-library-grid footer { margin-top: 6px; }
.oh-story-production:has(> .oh-story-canvas-shell) { display: flex; flex-direction: column; }
.oh-story-production:has(> .oh-story-canvas-shell) > :not(.oh-story-canvas-shell) { flex: none; }
.oh-story-canvas-shell { position: relative; display: flex; min-height: 420px; flex: 1 0 420px; flex-direction: column; overflow: hidden; }
.oh-story-canvas-toolbar { display: flex; flex: none; align-items: center; gap: 10px; padding: 8px 12px; border-bottom: 1px solid var(--os-border); }
.oh-story-canvas-help { overflow: hidden; min-width: 0; flex: 1; color: var(--os-muted); font-size: 11px; text-overflow: ellipsis; white-space: nowrap; }
.oh-story-canvas-controls { display: flex; flex: none; align-items: center; overflow: hidden; border: 1px solid var(--os-border); border-radius: 8px; background: var(--dsw-alias-bg-layer-1); }
.oh-story-production .oh-story-canvas-controls button { min-width: 28px; height: 26px; border: 0; border-radius: 0; padding: 0 8px; background: transparent; }
.oh-story-production .oh-story-canvas-controls button + button,
.oh-story-production .oh-story-canvas-controls span + button { border-left: 1px solid var(--os-border); }
.oh-story-canvas-controls span { min-width: 44px; border-left: 1px solid var(--os-border); color: var(--dsw-alias-label-secondary); font: var(--os-mono); line-height: 26px; text-align: center; font-variant-numeric: tabular-nums; }
.oh-story-canvas-viewport { position: relative; width: 100%; min-height: 0; flex: 1; overflow: hidden; cursor: grab; touch-action: none; overscroll-behavior: contain; background-color: var(--dsw-alias-bg-base); background-image: radial-gradient(var(--os-border) 1px, transparent 1px); background-size: 20px 20px; }
.oh-story-canvas-viewport[data-panning] { cursor: grabbing; }
.oh-story-canvas-viewport:focus-visible { outline: 2px solid var(--dsw-alias-state-business-primary); outline-offset: -2px; }
.oh-story-canvas { position: absolute; top: 0; left: 0; width: 0; height: 0; overflow: visible; transform-origin: 0 0; }
.oh-story-canvas svg { position: absolute; top: 0; left: 0; width: 1px; height: 1px; overflow: visible; pointer-events: none; }
.oh-story-canvas path { fill: none; opacity: .6; stroke: var(--dsw-alias-border-l2); stroke-width: 1.5; }
.oh-story-canvas path[data-active] { opacity: .9; stroke-width: 2.5; stroke: var(--dsw-alias-state-business-primary); }
.oh-story-canvas article { position: absolute; display: flex; width: 180px; min-height: 76px; box-sizing: border-box; flex-direction: column; gap: 4px; padding: 10px; border: 1px solid var(--os-border); border-radius: 8px; background: var(--dsw-alias-bg-layer-1); box-shadow: 0 4px 14px rgb(0 0 0 / 8%); cursor: grab; user-select: none; touch-action: none; }
.oh-story-canvas article:active,
.oh-story-canvas article[data-dragging] { z-index: 2; cursor: grabbing; }
.oh-story-canvas article[data-selected] { z-index: 1; }
.oh-story-canvas article[data-node-type="shot"] { border-color: var(--dsw-alias-state-business-primary); }
.oh-story-canvas article[data-selected] { box-shadow: 0 0 0 2px color-mix(in srgb, var(--dsw-alias-state-business-primary) 28%, transparent), 0 4px 14px rgb(0 0 0 / 8%); }
.oh-story-canvas article small { color: var(--os-muted); text-transform: uppercase; }
.oh-story-canvas article strong,
.oh-story-canvas article span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oh-story-canvas article span { color: var(--os-muted); font-size: 10px; }

[data-conversation-scroll][data-oh-story-layout="medium"]:has(> [data-slot="conversation.session"] > .oh-story-split-surface[data-open="true"]) {
  grid-template-columns: clamp(104px, 18%, 184px) minmax(200px, 1fr) clamp(300px, 45%, 408px);
}

[data-conversation-scroll][data-oh-story-layout="compact"]:has(> [data-slot="conversation.session"] > .oh-story-split-surface[data-open="true"]) {
  grid-template-columns: clamp(80px, 16%, 104px) minmax(0, 1fr) clamp(228px, 48%, 300px);
}

[data-oh-story-layout="medium"] .oh-story-file-folder > summary { padding-left: min(calc(7px + var(--oh-story-indent, 0px)), 35px); }
[data-oh-story-layout="medium"] .oh-story-tree nav button { padding-left: min(calc(14px + var(--oh-story-indent, 0px)), 42px); }
[data-oh-story-layout="medium"] .oh-story-editor textarea { padding-right: 28px; padding-left: 28px; }

[data-oh-story-layout="compact"] .oh-story-tree { padding-inline: 4px; }
[data-oh-story-layout="compact"] .oh-story-brand { gap: 4px; padding-inline: 2px; font-size: 11px; }
[data-oh-story-layout="compact"] .oh-story-brand-cluster { gap: 4px; }
[data-oh-story-layout="compact"] .oh-story-brand-cluster strong > span { display: none; }
[data-oh-story-layout="compact"] .oh-story-kind { padding-inline: 4px; font-size: 11px; }
[data-oh-story-layout="compact"] .oh-story-brand button { width: 24px; height: 24px; }
[data-oh-story-layout="compact"] .oh-story-mode-tabs { margin-inline: 0; }
[data-oh-story-layout="compact"] .oh-story-mode-tabs button { padding-inline: 3px; font-size: 11px; }
[data-oh-story-layout="compact"] .oh-story-workbench-nav,
[data-oh-story-layout="medium"] .oh-story-workbench-nav { margin-inline: 0; }
[data-oh-story-layout="compact"] .oh-story-workbench-nav .oh-story-mode-tabs,
[data-oh-story-layout="medium"] .oh-story-workbench-nav .oh-story-mode-tabs { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
[data-oh-story-layout="compact"] .oh-story-file-folder > summary { padding-left: min(calc(5px + var(--oh-story-indent, 0px)), 19px); }
[data-oh-story-layout="compact"] .oh-story-tree nav button { padding-right: 4px; padding-left: min(calc(7px + var(--oh-story-indent, 0px)), 21px); }
[data-oh-story-layout="compact"] .oh-story-editor > header {
  display: grid;
  min-height: 68px;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: 24px 36px;
  align-content: center;
  gap: 0;
  padding: 4px 3px;
}
[data-oh-story-layout="compact"] .oh-story-editor-path > span { display: none; }
[data-oh-story-layout="compact"] .oh-story-editor-path > strong { display: block; font-size: 11px; line-height: 24px; }
[data-oh-story-layout="compact"] .oh-story-editor-actions { width: 100%; min-width: 0; justify-content: flex-end; gap: 4px; }
[data-oh-story-layout="compact"] .oh-story-editor-tabs { min-width: 0; flex: 1; }
[data-oh-story-layout="compact"] .oh-story-editor-tabs button { min-width: 0; padding-inline: 2px; white-space: nowrap; }
[data-oh-story-layout="compact"] .oh-story-save { flex: none; padding-inline: 4px; white-space: nowrap; font-size: 11px; }
[data-oh-story-layout="compact"] .oh-story-editor textarea { padding: 16px 12px 40px; }
[data-oh-story-layout="compact"] .oh-story-markdown { padding: 18px 12px 48px; }
[data-oh-story-layout="compact"] .oh-story-jsonl-summary { padding-inline: 10px; }
[data-oh-story-layout="compact"] .oh-story-jsonl-records { padding: 8px 7px 28px; }
[data-oh-story-layout="compact"] .oh-story-jsonl summary { gap: 6px; padding-inline: 7px; }
[data-oh-story-layout="compact"] .oh-story-jsonl summary > span { display: none; }
[data-oh-story-layout="compact"] .oh-story-jsonl summary > strong { min-width: 32px; }
[data-oh-story-layout="compact"] .oh-story-jsonl summary > code,
[data-oh-story-layout="compact"] .oh-story-jsonl summary > em { display: none; }

[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="medium"]:has(> [data-slot="conversation.session"] > .oh-story-split-surface[data-open="true"]) {
  grid-template-columns: minmax(0, 1fr) clamp(360px, 42%, 440px);
}
[data-oh-story-workbench="game"][data-oh-story-layout="medium"] .oh-game-toolbar { grid-template-columns: auto minmax(140px, 1fr) auto; }

[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"]:has(> [data-slot="conversation.session"] > .oh-story-split-surface[data-open="true"]) {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  overflow: hidden;
}
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"]
  > [data-slot="conversation.session"] > :not(.oh-story-split-surface),
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"]
  > [data-composer-seat],
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-studio {
  grid-column: 1;
}
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"][data-oh-studio-pane="studio"]
  > [data-slot="conversation.session"] > :not(.oh-story-split-surface),
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"][data-oh-studio-pane="studio"]
  > [data-composer-seat],
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"][data-oh-studio-pane="chat"] .oh-game-studio { display: none; }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-mobile-switcher {
  display: flex;
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 20;
  border-color: var(--dsw-alias-border-l1);
  box-shadow: 0 4px 14px rgb(0 0 0 / 12%);
}
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-mobile-switcher button { min-width: 52px; min-height: 32px; }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-toolbar {
  min-height: 101px;
  grid-template-columns: auto minmax(0, 1fr) 112px;
  grid-template-rows: 44px 44px;
  align-content: center;
  gap: 5px;
  padding: 4px 8px;
}
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-toolbar > .oh-workbench-cluster { grid-column: 1; grid-row: 1; width: fit-content; }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-project > span { display: none; }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-project { grid-column: 1 / -1; grid-row: 2; }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-project select { max-width: none; width: 100%; min-height: 44px; }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-tabs { grid-column: 2; grid-row: 1; width: fit-content; justify-self: end; }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-mode-tabs button,
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-tabs button { min-height: 44px; }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-preview-shell { grid-template-rows: 46px minmax(0, 1fr); }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-preview-status button { min-height: 36px; }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-reload b { display: none; }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-preview-status { padding-left: 8px; }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-preview-status > .oh-game-runtime-state { max-width: 40%; }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-focus-hint { display: none; }
.oh-game-runtime-state > em { display: block; overflow: hidden; min-width: 0; font-style: normal; text-overflow: ellipsis; white-space: nowrap; }

/* DSH may keep its navigation drawer open at a 500 px browser viewport,
   leaving the conversation center close to 212 px wide. The Studio publishes
   its measured width because a container style query cannot style the
   container itself. Row one stays clear for the \u5236\u4F5C / \u5BF9\u8BDD switch. */
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-studio[data-oh-game-narrow] .oh-game-toolbar {
  min-height: 193px;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: repeat(4, 44px);
  align-content: center;
  padding: 4px 8px;
}
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-studio[data-oh-game-narrow] .oh-game-toolbar > .oh-workbench-cluster {
  grid-column: 1;
  grid-row: 2;
  justify-self: start;
}
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-studio[data-oh-game-narrow] .oh-game-tabs {
  grid-column: 1;
  grid-row: 3;
  justify-self: start;
}
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-studio[data-oh-game-narrow] .oh-game-project {
  grid-column: 1;
  grid-row: 4;
}
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-studio[data-oh-game-narrow] .oh-game-project select {
  width: 100%;
  max-width: none;
  min-height: 44px;
}
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-studio[data-oh-game-narrow] .oh-game-preview-status {
  gap: 4px;
  padding-right: 6px;
  padding-left: 6px;
}
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-studio[data-oh-game-narrow] .oh-game-preview-status > .oh-game-runtime-state { max-width: 36%; }

@media (prefers-reduced-motion: reduce) {
  .oh-game-preview-shell[data-state="building"] { animation: none; }
}

@media (prefers-contrast: more) {
  .oh-game-preview-status button,
  .oh-game-tabs,
  .oh-game-mode-tabs,
  .oh-game-mobile-switcher { border-width: 2px; }
}
[data-oh-story-layout="compact"] .oh-story-production-summary { display: none; }
[data-oh-story-layout="compact"] .oh-story-production-bar { flex-wrap: wrap; padding-inline: 4px; }
[data-oh-story-layout="compact"] .oh-story-production-tabs { width: 100%; gap: 0; }
[data-oh-story-layout="compact"] .oh-story-production-tabs button { min-width: 0; flex: 1; padding-inline: 0; font-size: 11px; }
[data-oh-story-layout="compact"] .oh-story-production-meta { width: 100%; justify-content: flex-end; }
[data-oh-story-layout="compact"] .oh-story-shot-grid,
[data-oh-story-layout="compact"] .oh-story-asset-grid { grid-template-columns: minmax(0, 1fr); }
[data-oh-story-layout="compact"] .oh-story-media-library > header { align-items: stretch; flex-direction: column; }
[data-oh-story-layout="compact"] .oh-story-media-library > header > div:last-child { display: grid; grid-template-columns: minmax(0, 1fr) auto; }
[data-oh-story-layout="compact"] .oh-story-media-library input { width: 100%; }
[data-oh-story-layout="compact"] .oh-story-canvas-toolbar { flex-wrap: wrap; }
[data-oh-story-layout="compact"] .oh-story-canvas-help { flex-basis: 100%; white-space: normal; }
[data-oh-story-layout="compact"] .oh-story-canvas-controls { max-width: 100%; flex-wrap: wrap; }
[data-oh-story-layout="compact"] .oh-story-production .oh-story-canvas-controls button { flex: 1; }
[data-oh-story-layout="compact"] .oh-story-sequence { padding-inline: 6px; }
[data-oh-story-layout="compact"] .oh-story-sequence-summary span { display: none; }
[data-oh-story-layout="compact"] .oh-story-sequence > ol > li { grid-template-columns: 44px minmax(0, 1fr) auto; gap: 6px; padding: 6px; }
[data-oh-story-layout="compact"] .oh-story-sequence > ol > li > span { display: none; }
[data-oh-story-layout="compact"] .oh-story-sequence > ol > li .oh-story-media-preview,
[data-oh-story-layout="compact"] .oh-story-sequence-missing { width: 44px; height: 44px; }
[data-oh-story-layout="compact"] .oh-story-sequence-main { display: contents; }
[data-oh-story-layout="compact"] .oh-story-sequence-main select { grid-column: 1 / -1; grid-row: 2; }
[data-oh-story-layout="compact"] .oh-story-sequence-move { grid-row: 1; grid-column: 3; }
[data-oh-story-layout="compact"] .oh-story-provider-list li { grid-template-columns: 6px minmax(0, 1fr); }
[data-oh-story-layout="compact"] .oh-story-provider-list li > span { display: none; }
[data-oh-story-layout="compact"] .oh-story-provider-list li > small { grid-column: 2; }
[data-oh-story-layout="compact"] .oh-story-production-diagnostics li { grid-template-columns: minmax(0, 1fr); gap: 0; }
[data-oh-story-layout="compact"] .oh-story-status-panel > footer { flex-wrap: wrap; }

/* Video mode intentionally stays a preview surface: one player, a read-only artifact view,
   and the official DSH Conversation. It shares no nonlinear-editor or timeline runtime. */
[data-conversation-scroll][data-oh-story-workbench="video"]:has(> [data-slot="conversation.session"] > .oh-story-split-surface[data-open="true"]) {
  --video-stage: #0b0d10;
  --video-stage-raised: #15181d;
  --video-accent: var(--dsw-alias-state-business-primary);
  --video-warning: #f4bd55;
  --video-danger: #f06b63;
  grid-template-columns: minmax(0, 1fr) clamp(400px, 34%, 520px);
  overflow: hidden;
}
[data-conversation-scroll][data-oh-story-workbench="video"]:has(> [data-slot="conversation.session"] > .oh-story-split-surface[data-open="true"])
  > [data-slot="conversation.session"] > :not(.oh-story-split-surface),
[data-conversation-scroll][data-oh-story-workbench="video"]:has(> [data-slot="conversation.session"] > .oh-story-split-surface[data-open="true"])
  > [data-composer-seat] { grid-column: 2; }

.oh-video-studio {
  box-sizing: border-box;
  display: flex;
  grid-column: 1;
  grid-row: 1;
  position: sticky;
  top: 0;
  min-width: 0;
  min-height: 0;
  height: 100%;
  align-self: start;
  overflow: hidden;
  flex-direction: column;
  border-right: 1px solid var(--os-border);
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-base);
}
.oh-video-studio[hidden] { display: none; }
.oh-video-toolbar {
  box-sizing: border-box;
  display: grid;
  min-height: 100px;
  flex: none;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-rows: 40px 40px;
  align-items: center;
  gap: 4px 12px;
  padding: 8px 12px 9px;
  border-bottom: 1px solid var(--os-border);
  background: var(--dsw-alias-bg-base);
}
.oh-video-mode-tabs { display: flex; width: fit-content; grid-column: 1; grid-row: 1; padding: 2px; border: 1px solid var(--os-border); border-radius: 9px; background: var(--dsw-alias-bg-layer-1); }
.oh-video-mode-tabs button,
.oh-video-tabs button,
.oh-video-version-tabs button {
  min-height: 36px;
  border: 0;
  border-radius: 6px;
  padding: 4px 8px;
  color: var(--os-muted);
  background: transparent;
  cursor: pointer;
  white-space: nowrap;
  font: 12px/1 var(--dsw-font-family);
}
.oh-video-mode-tabs button { min-width: 48px; }
.oh-video-mode-tabs button:hover,
.oh-video-tabs button:hover,
.oh-video-version-tabs button:hover { color: var(--dsw-alias-label-primary); }
.oh-video-mode-tabs button[aria-selected="true"],
.oh-video-tabs button[aria-selected="true"],
.oh-video-version-tabs button[aria-selected="true"] { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-base); box-shadow: 0 1px 2px rgb(0 0 0 / 9%); font-weight: 600; }
.oh-video-project { display: flex; min-width: 0; grid-column: 1; grid-row: 2; align-items: center; gap: 9px; color: var(--os-muted); font-size: 11px; }
.oh-video-project select {
  width: min(100%, 440px);
  min-width: 0;
  min-height: 36px;
  border: 1px solid var(--os-border);
  border-radius: 8px;
  padding: 6px 28px 6px 9px;
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-base);
  overflow: hidden;
  text-overflow: ellipsis;
  font: inherit;
  font-weight: 500;
}
.oh-video-tabs,
.oh-video-version-tabs { display: flex; padding: 2px; border: 1px solid var(--os-border); border-radius: 9px; }
.oh-video-tabs { grid-column: 2; grid-row: 1; }
.oh-video-tabs button { min-width: 56px; }
.oh-video-panels,
.oh-video-panels > [role="tabpanel"] { display: flex; min-width: 0; min-height: 0; flex: 1; overflow: hidden; flex-direction: column; }
.oh-video-panels > [hidden] { display: none; }

.oh-video-preview-shell { display: grid; min-width: 0; min-height: 0; flex: 1; grid-template-rows: 48px minmax(0, 1fr); overflow: hidden; border-top: 2px solid var(--video-accent); background: var(--video-stage); }
.oh-video-preview-shell[data-state="building"] { border-top-color: var(--video-warning); }
.oh-video-preview-shell[data-state="error"] { border-top-color: var(--video-danger); }
.oh-video-stagebar { display: grid; min-width: 0; grid-template-columns: auto minmax(80px, 1fr) auto; align-items: center; gap: 10px; padding: 0 10px; color: rgb(244 248 255 / 74%); background: var(--video-stage-raised); font-size: 11px; }
.oh-video-version-tabs { border-color: rgb(255 255 255 / 13%); }
.oh-video-version-tabs button[aria-selected="true"] { color: #fff; background: rgb(255 255 255 / 12%); }
.oh-video-preview-actions { display: flex; gap: 5px; }
.oh-video-preview-actions button,
.oh-video-preview-actions a { display: grid; min-width: 34px; min-height: 34px; box-sizing: border-box; place-items: center; border: 1px solid rgb(255 255 255 / 14%); border-radius: 6px; padding: 3px 8px; color: rgb(255 255 255 / 84%); background: rgb(255 255 255 / 5%); cursor: pointer; text-decoration: none; font: inherit; }
.oh-video-preview-actions svg { width: 16px; height: 16px; }
.oh-video-preview-actions button:hover,
.oh-video-preview-actions a:hover { background: rgb(255 255 255 / 11%); }
.oh-video-player-stage { display: grid; min-width: 0; min-height: 0; place-items: center; overflow: hidden; padding: 14px; background: radial-gradient(circle at 50% 40%, #1b2027, var(--video-stage) 62%); }
.oh-video-player-stage video { display: block; width: min(100%, 1200px); height: auto; max-width: 100%; max-height: 100%; border-radius: 4px; object-fit: contain; background: #000; box-shadow: 0 16px 50px rgb(0 0 0 / 32%); }
.oh-video-preview-shell:fullscreen { width: 100vw; height: 100vh; }

.oh-video-preview-empty { display: grid; width: 100%; min-height: 0; box-sizing: border-box; flex: 1; margin: auto; place-items: center; align-content: center; gap: 9px; padding: 36px; color: rgb(244 248 255 / 70%); background: var(--video-stage); text-align: center; line-height: 1.65; }
.oh-video-preview-empty > span { color: var(--video-accent); font-size: 32px; }
.oh-video-preview-empty strong { color: rgb(255 255 255 / 92%); }
.oh-video-preview-empty p { max-width: 560px; margin: 0; }
.oh-video-preview-empty code { color: rgb(255 255 255 / 88%); }

.oh-video-environment { display: grid; gap: 5px; margin-bottom: 8px; padding: 8px; border: 1px solid var(--os-border); border-radius: 8px; background: var(--dsw-alias-bg-layer-1); }
.oh-video-environment strong { font-size: 11px; }
.oh-video-environment span { color: var(--os-muted); font-size: 10px; }
.oh-video-environment em { color: var(--os-muted); font-size: 10px; font-style: normal; line-height: 1.5; }
.oh-video-environment code { font-size: 10px; }
.oh-video-environment span::before { content: "\u25CF"; margin-right: 5px; color: var(--video-danger); }
.oh-video-environment span[data-ready]::before { color: var(--dsw-alias-state-success-primary, #45b96f); }
.oh-video-environment button { min-height: 30px; border: 1px solid var(--os-border); border-radius: 6px; color: inherit; background: var(--dsw-alias-bg-base); cursor: pointer; font: inherit; }

[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="medium"]:has(> [data-slot="conversation.session"] > .oh-story-split-surface[data-open="true"]) { grid-template-columns: minmax(0, 1fr) clamp(360px, 42%, 440px); }
[data-oh-story-workbench="video"][data-oh-story-layout="medium"] .oh-video-project select { width: 100%; }

[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"]:has(> [data-slot="conversation.session"] > .oh-story-split-surface[data-open="true"]) { display: grid; grid-template-columns: minmax(0, 1fr); overflow: hidden; }
[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"]
  > [data-slot="conversation.session"] > :not(.oh-story-split-surface),
[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"]
  > [data-composer-seat],
[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"] .oh-video-studio { grid-column: 1; }
[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"][data-oh-studio-pane="studio"]
  > [data-slot="conversation.session"] > :not(.oh-story-split-surface),
[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"][data-oh-studio-pane="studio"]
  > [data-composer-seat],
[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"][data-oh-studio-pane="chat"] .oh-video-studio { display: none; }
[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"] .oh-game-mobile-switcher { display: flex; position: absolute; top: 8px; right: 8px; z-index: 20; border-color: var(--dsw-alias-border-l1); box-shadow: 0 4px 14px rgb(0 0 0 / 12%); }
[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"] .oh-video-toolbar { min-height: 142px; grid-template-columns: minmax(0, 1fr) auto; grid-template-rows: 44px 44px 38px; align-content: center; gap: 2px 6px; padding: 4px 8px; }
[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"] .oh-video-toolbar > .oh-workbench-cluster { grid-column: 1 / -1; grid-row: 1; width: fit-content; }
[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"] .oh-video-tabs { grid-column: 2; grid-row: 2; justify-self: end; }
[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"] .oh-video-project { grid-column: 1; grid-row: 2; }
[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"] .oh-video-stagebar { grid-template-columns: minmax(0, 1fr) auto; grid-template-rows: 42px 38px; gap: 2px 6px; padding: 3px 7px; }
[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"] .oh-video-preview-shell { grid-template-rows: 86px minmax(0, 1fr); }
[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"] .oh-video-version-tabs { grid-column: 1; grid-row: 1; }
[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"] .oh-video-preview-actions { grid-column: 2; grid-row: 1 / 3; }
[data-conversation-scroll][data-oh-story-workbench="video"][data-oh-story-layout="compact"] .oh-video-preview-actions button:first-child { max-width: 70px; }

/* The short-drama studio occupies only the plugin seat. DSH keeps its own Chat,
   Composer, model, approvals and history mounted beside this surface. */
[data-conversation-scroll][data-oh-story-workbench="drama"]:has(> [data-slot="conversation.session"] > .oh-story-split-surface[data-open="true"]) {
  --oh-drama-files-width: 0px;
  --oh-drama-chat-width: 0px;
  grid-template-columns: var(--oh-drama-files-width) minmax(0, 1fr) var(--oh-drama-chat-width);
  grid-template-rows: auto minmax(0, 1fr);
  overflow: hidden;
}
[data-conversation-scroll][data-oh-story-workbench="drama"][data-oh-drama-files="open"]:has(> [data-slot="conversation.session"] > .oh-story-split-surface[data-open="true"]) { --oh-drama-files-width: 200px; }
[data-conversation-scroll][data-oh-story-workbench="drama"][data-oh-drama-chat="open"]:has(> [data-slot="conversation.session"] > .oh-story-split-surface[data-open="true"]) { --oh-drama-chat-width: clamp(320px, 34%, 440px); overflow-y: auto; }
[data-conversation-scroll][data-oh-story-workbench="drama"]:has(> [data-slot="conversation.session"] > .oh-story-split-surface[data-open="true"]) > [data-slot="conversation.session"] > :not(.oh-story-split-surface),
[data-conversation-scroll][data-oh-story-workbench="drama"]:has(> [data-slot="conversation.session"] > .oh-story-split-surface[data-open="true"]) > [data-composer-seat] { grid-column: 3; grid-row: 1 / 3; }
[data-conversation-scroll][data-oh-story-workbench="drama"][data-oh-drama-chat="closed"] > [data-slot="conversation.session"] > :not(.oh-story-split-surface),
[data-conversation-scroll][data-oh-story-workbench="drama"][data-oh-drama-chat="closed"] > [data-composer-seat] { display: none; }
[data-workbench="drama"] > .oh-story-tree { grid-column: 1; grid-row: 2; border-top: 1px solid var(--os-border); }
[data-workbench="drama"][data-drama-files="closed"] > .oh-story-tree { display: none; }
[data-workbench="drama"] > .oh-story-tree > .oh-story-brand { display: none; }
[data-workbench="drama"] > .oh-story-editor { grid-column: 2; grid-row: 2; min-width: 0; border-left: 0; }
[data-workbench="drama"] > .oh-story-editor[data-drama-canvas] > header { display: none; }
.oh-drama-workspace-toolbar { position: sticky; z-index: 12; top: 0; display: flex; min-width: 0; min-height: 44px; grid-column: 1 / 3; grid-row: 1; align-items: center; flex-wrap: wrap; gap: 8px 12px; box-sizing: border-box; padding: 7px 12px; border-bottom: 1px solid var(--os-border); color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-base); font: 12px/1.5 var(--dsw-font-family); }
.oh-drama-workspace-brand { display: flex; min-width: 0; align-items: center; gap: 12px; }
.oh-drama-workspace-brand .oh-story-mode-tabs { margin: 0; padding: 2px; }
.oh-drama-workspace-brand .oh-story-mode-tabs button { min-height: 24px; padding: 1px 7px; }
.oh-drama-episode-picker { display: flex; min-width: 0; align-items: center; gap: 6px; color: var(--os-muted); font-size: 11px; }
.oh-drama-episode-picker select { max-width: 150px; min-width: 72px; height: 28px; box-sizing: border-box; border: 1px solid var(--os-border); border-radius: 6px; color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-base); font: inherit; }
.oh-drama-workspace-views { display: flex; gap: 2px; padding: 2px; border: 1px solid var(--os-border); border-radius: 6px; }
.oh-drama-workspace-views button { min-height: 24px; border: 0; border-radius: 4px; padding: 0 9px; color: var(--os-muted); background: transparent; cursor: pointer; font: inherit; font-size: 11px; }
.oh-drama-workspace-views button[aria-selected="true"] { color: var(--dsw-alias-state-business-primary); background: color-mix(in srgb, var(--dsw-alias-state-business-primary) 8%, transparent); }
.oh-drama-workspace-actions { display: flex; flex: 1; justify-content: flex-end; align-items: center; gap: 5px; }
.oh-drama-workspace-actions button { min-height: 27px; box-sizing: border-box; border: 1px solid var(--os-border); border-radius: 5px; padding: 2px 8px; color: var(--os-muted); background: var(--dsw-alias-bg-base); cursor: pointer; font: inherit; font-size: 11px; white-space: nowrap; }
.oh-drama-workspace-actions button[aria-expanded="true"] { color: var(--dsw-alias-state-business-primary); border-color: color-mix(in srgb, var(--dsw-alias-state-business-primary) 35%, var(--os-border)); }
.oh-drama-workspace-toolbar button:hover { background: var(--dsw-alias-interactive-bg-hover); }
.oh-drama-workspace-toolbar button:focus-visible,
.oh-drama-workspace-toolbar select:focus-visible { outline: 2px solid var(--dsw-alias-state-business-primary); outline-offset: 2px; }
[data-drama-canvas] > .oh-story-production { overflow: hidden; }
.oh-story-production-details { position: relative; flex: none; }
.oh-story-production .oh-story-shot-list-trigger { color: var(--os-muted); }
.oh-story-production .oh-story-shot-list-trigger[aria-pressed="true"] { color: var(--dsw-alias-state-business-primary); }
.oh-story-card-details { margin-top: 8px; color: var(--os-muted); font-size: 11px; }
.oh-story-card-details summary { cursor: pointer; }
.oh-story-card-details > :not(summary) { margin-top: 6px; }
.oh-story-production:has(> .oh-story-canvas-shell) { height: 100%; min-height: 0; }
.oh-story-production:has(> .oh-story-canvas-shell) .oh-story-production-status { margin-top: 0; }
.oh-story-production:has(> .oh-story-canvas-shell) .oh-story-status-pills { padding: 7px 12px; }
.oh-story-production:has(> .oh-story-canvas-shell) .oh-story-status-panel { position: absolute; z-index: 15; top: 100%; right: 12px; left: 12px; max-height: min(55vh, 420px); overflow: auto; box-shadow: 0 6px 24px rgb(0 0 0 / 10%); }
.oh-story-canvas-shell { min-height: 240px; flex: 1 1 0; }
.oh-story-canvas-viewport { background-color: color-mix(in srgb, var(--dsw-alias-bg-layer-1) 75%, var(--dsw-alias-bg-base)); }
.oh-story-canvas-toolbar { order: 2; justify-content: space-between; border-top: 1px solid var(--os-border); border-bottom: 0; background: var(--dsw-alias-bg-base); }
.oh-story-canvas-help { max-width: 70%; font-size: 10px; }
.oh-story-canvas-group-label { position: absolute; color: var(--dsw-alias-label-secondary); font: 500 14px/1.5 var(--dsw-font-family); white-space: nowrap; pointer-events: none; }
.oh-story-canvas article.oh-story-canvas-node { display: flex; overflow: visible; gap: 0; padding: 0; border-color: var(--os-border); border-radius: 9px; background: var(--dsw-alias-bg-base); box-shadow: 0 2px 8px rgb(0 0 0 / 4%); cursor: default; }
.oh-story-canvas article.oh-story-canvas-node[data-selected] { border-color: var(--dsw-alias-state-business-primary); box-shadow: 0 0 0 2px color-mix(in srgb, var(--dsw-alias-state-business-primary) 12%, transparent), 0 2px 8px rgb(0 0 0 / 4%); }
.oh-story-canvas article.oh-story-canvas-node[data-node-type="story"] { border-color: color-mix(in srgb, var(--dsw-alias-state-warn-label) 18%, var(--os-border)); background: color-mix(in srgb, var(--dsw-alias-state-warn-label) 4%, var(--dsw-alias-bg-base)); }
.oh-story-canvas-node-head { display: flex; min-height: 36px; flex: none; justify-content: space-between; align-items: center; gap: 8px; padding: 0 12px; border-bottom: 1px solid var(--os-border); border-radius: 8px 8px 0 0; cursor: grab; }
.oh-story-canvas-node-head strong { color: var(--dsw-alias-label-primary); font-size: 12px; font-weight: 500; }
.oh-story-canvas-node-head small { flex: none; font-size: 10px; }
.oh-story-canvas-node-media { position: relative; display: flex; height: 154px; min-height: 0; flex: none; justify-content: center; align-items: center; overflow: hidden; background: var(--dsw-alias-button-ghost-active-fill); }
.oh-story-canvas-node-media img,
.oh-story-canvas-node-media video { display: block; width: 100%; height: 100%; object-fit: contain; }
.oh-story-canvas-node-placeholder { display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; color: var(--os-muted); background: color-mix(in srgb, var(--dsw-alias-state-business-primary) 3%, var(--dsw-alias-bg-base)); font-size: 12px; }
.oh-story-canvas-node-copy { min-height: 0; flex: none; overflow: hidden; margin: 10px 12px 5px; color: var(--dsw-alias-label-secondary); font-size: 11.5px; line-height: 1.7; white-space: pre-line; overflow-wrap: anywhere; }
.oh-story-canvas-node-meta { display: flex; min-height: 20px; flex: none; align-items: center; flex-wrap: wrap; gap: 6px; padding: 0 12px; color: var(--os-muted); font-size: 10px; }
.oh-story-canvas-node-actions { display: flex; min-height: 33px; flex: none; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 4px; margin-top: auto; padding: 6px 10px; border-top: 1px solid var(--os-border); }
.oh-story-production .oh-story-canvas-node-actions button { min-height: 25px; border: 0; padding: 3px 5px; color: var(--dsw-alias-state-business-primary); background: transparent; font-size: 10.5px; }
.oh-story-canvas-node-versions { display: flex; min-height: 32px; flex: none; align-items: center; gap: 5px; padding: 2px 12px 6px; }
.oh-story-production .oh-story-canvas-node-versions button { width: 26px; height: 20px; overflow: hidden; flex: none; padding: 0; border-radius: 3px; }
.oh-story-canvas-node-versions button[aria-pressed="true"] { outline: 1px solid var(--dsw-alias-state-business-primary); outline-offset: 1px; }
.oh-story-canvas-node-versions img,
.oh-story-canvas-node-versions video { width: 100%; height: 100%; object-fit: cover; }
.oh-story-canvas-node-versions > span { font-size: 10px; }
.oh-story-canvas-context { display: flex; min-height: 38px; flex: none; align-items: center; justify-content: space-between; gap: 10px; padding: 7px 12px; border-top: 1px solid var(--os-border); color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-bg-base); font-size: 11px; }
.oh-story-canvas-context-copy { overflow: hidden; min-width: 0; text-overflow: ellipsis; white-space: nowrap; }
.oh-story-canvas-context button { flex: none; }
.oh-story-canvas .oh-story-canvas-node p,
.oh-story-canvas .oh-story-canvas-node span { white-space: normal; }
.oh-story-canvas .oh-story-canvas-node strong { min-width: 0; }
.oh-story-canvas .oh-story-canvas-node-meta span { white-space: nowrap; }

[data-conversation-scroll][data-oh-story-workbench="drama"][data-oh-story-layout="medium"][data-oh-drama-files="open"]:has(> [data-slot="conversation.session"] > .oh-story-split-surface[data-open="true"]) { --oh-drama-files-width: 160px; }
[data-conversation-scroll][data-oh-story-workbench="drama"][data-oh-story-layout="medium"][data-oh-drama-chat="open"]:has(> [data-slot="conversation.session"] > .oh-story-split-surface[data-open="true"]) { --oh-drama-chat-width: clamp(240px, 34%, 320px); }
[data-oh-story-workbench="drama"][data-oh-story-layout="medium"] .oh-story-production-bar { flex-wrap: wrap; gap: 8px; }
[data-oh-story-workbench="drama"][data-oh-story-layout="medium"] .oh-story-production-tabs { min-height: 28px; flex-shrink: 0; }
[data-oh-story-workbench="drama"][data-oh-story-layout="medium"] .oh-story-production-tabs button { white-space: nowrap; }
[data-oh-story-workbench="drama"][data-oh-story-layout="medium"] .oh-story-production-meta { flex-wrap: wrap; white-space: nowrap; }
[data-conversation-scroll][data-oh-story-workbench="drama"][data-oh-story-layout="compact"]:has(> [data-slot="conversation.session"] > .oh-story-split-surface[data-open="true"]) { --oh-drama-files-width: 0px; --oh-drama-chat-width: 0px; grid-template-columns: 0 minmax(0, 1fr) 0; }
[data-conversation-scroll][data-oh-story-workbench="drama"][data-oh-story-layout="compact"][data-oh-drama-chat="open"]:has(> [data-slot="conversation.session"] > .oh-story-split-surface[data-open="true"]) { grid-template-columns: 0 0 minmax(0, 1fr); }
[data-oh-story-workbench="drama"][data-oh-story-layout="compact"] .oh-drama-workspace-toolbar { grid-column: 1 / -1; gap: 5px 7px; padding: 6px 8px; }
[data-oh-story-workbench="drama"][data-oh-story-layout="compact"] .oh-drama-workspace-brand { gap: 7px; }
[data-oh-story-workbench="drama"][data-oh-story-layout="compact"] .oh-drama-workspace-brand .oh-story-mode-tabs button { padding-inline: 5px; font-size: 10px; }
[data-oh-story-workbench="drama"][data-oh-story-layout="compact"] .oh-drama-episode-picker > span { display: none; }
[data-oh-story-workbench="drama"][data-oh-story-layout="compact"] .oh-drama-episode-picker select { max-width: 78px; min-width: 65px; font-size: 10px; }
[data-oh-story-workbench="drama"][data-oh-story-layout="compact"] .oh-drama-workspace-actions { flex: 1; }
[data-oh-story-workbench="drama"][data-oh-story-layout="compact"] .oh-drama-workspace-actions button { padding-inline: 6px; font-size: 10px; }
[data-oh-story-workbench="drama"][data-oh-story-layout="compact"] .oh-story-tree { position: absolute; z-index: 16; top: 82px; left: 0; width: min(220px, 70%); height: calc(100% - 82px); box-shadow: 5px 0 18px rgb(0 0 0 / 8%); }
[data-oh-story-workbench="drama"][data-oh-story-layout="compact"][data-oh-drama-chat="open"] .oh-story-editor,
[data-oh-story-workbench="drama"][data-oh-story-layout="compact"][data-oh-drama-chat="open"] .oh-story-tree { display: none; }
[data-oh-story-workbench="drama"][data-oh-story-layout="compact"] .oh-story-canvas-help { display: none; }
[data-oh-story-workbench="drama"][data-oh-story-layout="compact"] .oh-story-canvas-toolbar { justify-content: flex-start; }
.oh-story-canvas-edge-label { fill: var(--dsw-alias-label-secondary); opacity: .45; paint-order: stroke; stroke: var(--dsw-alias-bg-base); stroke-width: 5px; stroke-linejoin: round; text-anchor: middle; font: 10px var(--dsw-font-family); }
.oh-story-canvas-edge-label[data-active] { opacity: .9; fill: var(--dsw-alias-state-business-primary); }
.oh-story-canvas g[data-edge-kind="sequence"] path:not([data-active]) { opacity: .3; stroke-dasharray: 5 5; }
.oh-story-canvas-node-copy > strong { display: block; margin-bottom: 5px; color: var(--dsw-alias-label-primary); font-size: 13px; font-weight: 500; }
.oh-story-canvas-node-copy > p { display: -webkit-box; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 2; margin: 0; }
.oh-story-canvas-node-head > span { flex: none; font-size: 10px; }
.oh-story-canvas-context-copy > small { margin-right: 7px; color: var(--os-muted); }
.oh-story-canvas-context-copy > strong { font-weight: 500; }
.oh-story-canvas .oh-story-canvas-node-head { min-height: 50px; gap: 8px; }
.oh-story-canvas-node-head > div { min-width: 0; }
.oh-story-canvas-node-head > div > small { display: block; margin-bottom: 2px; font-size: 9px; }
.oh-story-canvas-node-head > div > strong { display: block; overflow: hidden; font-size: 13px; line-height: 1.5; text-overflow: ellipsis; white-space: nowrap; }
.oh-story-canvas-node-media { height: 136px; }
.oh-story-canvas-node[data-node-type="asset"] .oh-story-canvas-node-media { height: 124px; }
.oh-story-canvas-node-copy { margin: 8px 12px 4px; line-height: 1.5; }
.oh-story-canvas-node[data-node-type="story"] .oh-story-canvas-node-copy > p { -webkit-line-clamp: 5; }
.oh-story-canvas-node-actions:empty { display: none; }
.oh-story-canvas-node-actions { min-height: 29px; padding-block: 4px; }
.oh-story-canvas-node-versions { min-height: 27px; padding-bottom: 4px; }
.oh-story-canvas-node-meta { min-height: 18px; }
.oh-story-canvas-edge-label { opacity: 0; }
.oh-story-canvas-edge-label[data-active] { opacity: .85; }
.oh-story-canvas path:not([data-active]) { opacity: .35; }
.oh-drama-empty-workspace { display: flex; min-height: 240px; flex: 1; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 32px; color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-bg-base); font: 13px/1.8 var(--dsw-font-family); text-align: center; }
.oh-drama-empty-workspace strong { color: var(--dsw-alias-label-primary); font-size: 17px; font-weight: 500; }
.oh-drama-empty-workspace p { max-width: 400px; margin: 0; }
.oh-drama-empty-workspace button { margin-top: 8px; border: 1px solid var(--os-border); border-radius: 6px; padding: 7px 14px; color: var(--dsw-alias-state-business-primary); background: var(--dsw-alias-bg-layer-1); cursor: pointer; font: inherit; }

/* Games share the host theme and conversation; only their creator seat changes. */
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-game-chat="closed"]:has(> [data-slot="conversation.session"] > .oh-story-split-surface[data-open="true"]) { grid-template-columns: minmax(0, 1fr) 0; }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-game-chat="closed"] > [data-slot="conversation.session"] > :not(.oh-story-split-surface),
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-game-chat="closed"] > [data-composer-seat] { display: none; }
.oh-game-studio .oh-game-toolbar { display: flex; min-height: 56px; flex-wrap: wrap; gap: 8px 12px; padding: 9px 14px; }
.oh-game-studio .oh-workbench-cluster { display: flex; min-width: 0; align-items: center; gap: 10px; }
.oh-game-studio .oh-game-mode-tabs { gap: 1px; margin: 0; padding: 2px; border: 1px solid var(--os-border); border-radius: 6px; }
.oh-game-studio .oh-game-mode-tabs button { min-width: 0; min-height: 26px; padding: 3px 7px; font-size: 11px; }
.oh-game-studio .oh-game-project { min-width: 0; max-width: 330px; flex: 1 1 165px; }
.oh-game-studio .oh-game-project > span { display: none; }
.oh-game-studio .oh-game-project select { width: 100%; min-height: 32px; border-radius: 6px; font-size: 11px; }
.oh-game-toolbar-actions { display: flex; flex: none; align-items: center; gap: 5px; }
.oh-game-toolbar-actions > button,
.oh-game-document-body > header button,
.oh-game-create-empty button,
.oh-game-design-empty > button { min-height: 30px; border: 1px solid var(--os-border); border-radius: 6px; padding: 4px 10px; color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-bg-base); cursor: pointer; font: 11px/1.5 var(--dsw-font-family); }
.oh-game-toolbar-actions > button:hover,
.oh-game-document-body > header button:hover,
.oh-game-create-empty button:hover { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-layer-1); }
.oh-game-toolbar-actions > button[aria-expanded="true"] { color: var(--dsw-alias-state-business-primary); border-color: color-mix(in srgb, var(--dsw-alias-state-business-primary) 35%, var(--os-border)); background: color-mix(in srgb, var(--dsw-alias-state-business-primary) 4%, var(--dsw-alias-bg-base)); }
.oh-game-studio .oh-game-tabs { min-width: 0; flex: none; gap: 2px; margin-left: auto; border-radius: 6px; }
.oh-game-studio .oh-game-tabs button { min-width: 0; min-height: 29px; padding: 4px 11px; font-size: 11px; white-space: nowrap; }
.oh-game-studio button:focus-visible,
.oh-game-documents select:focus-visible,
.oh-game-documents textarea:focus-visible { outline: 2px solid var(--dsw-alias-state-business-primary); outline-offset: 2px; }
.oh-game-play-panel { gap: 15px; box-sizing: border-box; padding: 22px 24px 14px; background: var(--dsw-alias-bg-layer-1); }
.oh-game-play-panel > .oh-game-preview-shell { min-height: 180px; border: 1px solid var(--os-border); border-radius: 8px; grid-template-rows: 40px minmax(0, 1fr); box-shadow: 0 2px 12px rgb(0 0 0 / 3%); }
.oh-game-play-panel > .oh-game-preview-shell[data-update="pending"] { grid-template-rows: auto 40px minmax(0, 1fr); }
.oh-game-preview-shell:fullscreen { border: 0; border-radius: 0; width: 100%; height: 100%; }
.oh-game-preview-status { color: var(--dsw-alias-label-secondary); border-bottom: 1px solid var(--os-border); background: var(--dsw-alias-bg-base); }
.oh-game-preview-status button { min-height: 28px; border-color: var(--os-border); color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-bg-base); font-size: 10px; }
.oh-game-preview-status button:hover { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-layer-1); }
.oh-game-focus-hint { color: var(--dsw-alias-label-secondary); }
.oh-game-preview-status .oh-game-device { width: 27px; padding-inline: 3px; }
.oh-game-device[aria-pressed="true"] { color: var(--dsw-alias-state-business-primary); background: color-mix(in srgb, var(--dsw-alias-state-business-primary) 7%, var(--dsw-alias-bg-base)); }
.oh-game-preview-shell[data-device="phone"] iframe { width: min(390px, 100%); justify-self: center; }
.oh-game-new-version { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 10px 13px; color: var(--dsw-alias-label-primary); border-bottom: 1px solid var(--os-border); background: color-mix(in srgb, var(--dsw-alias-state-business-primary) 5%, var(--dsw-alias-bg-base)); }
.oh-game-new-version > div { min-width: 0; display: flex; flex-direction: column; gap: 4px; }
.oh-game-new-version strong { font-size: 11px; font-weight: 500; }
.oh-game-new-version span { color: var(--dsw-alias-label-secondary); font-size: 10px; }
.oh-game-new-version > button { flex: none; min-height: 29px; border: 1px solid var(--os-border); border-radius: 5px; padding: 3px 9px; color: var(--dsw-alias-state-business-primary); background: var(--dsw-alias-bg-base); font: 11px var(--dsw-font-family); cursor: pointer; }
.oh-game-play-panel .oh-game-preview-empty { color: var(--dsw-alias-label-secondary); border-radius: 8px; background: var(--dsw-alias-bg-base); }
.oh-game-documents { display: flex; flex: 1; min-height: 0; overflow: hidden; background: var(--dsw-alias-bg-base); }
.oh-game-documents > nav { width: 178px; min-width: 0; flex: none; overflow: auto; box-sizing: border-box; padding: 21px 10px; border-right: 1px solid var(--os-border); background: var(--dsw-alias-bg-layer-1); }
.oh-game-documents nav button { display: flex; width: 100%; align-items: center; justify-content: space-between; gap: 6px; min-height: 34px; border: 0; border-radius: 5px; padding: 8px 9px; color: var(--dsw-alias-label-secondary); background: transparent; text-align: left; font: 11px/1.7 var(--dsw-font-family); cursor: pointer; overflow-wrap: anywhere; }
.oh-game-documents nav button[aria-current="page"] { color: var(--dsw-alias-state-business-primary); background: color-mix(in srgb, var(--dsw-alias-state-business-primary) 7%, transparent); }
.oh-game-documents nav button > i { width: 5px; height: 5px; flex: none; border-radius: 50%; background: var(--dsw-alias-state-business-primary); }
.oh-game-documents nav details { margin-top: 17px; color: var(--dsw-alias-label-secondary); font-size: 10px; }
.oh-game-documents nav summary { padding: 8px; cursor: pointer; }
.oh-game-document-body { display: flex; min-height: 0; min-width: 0; flex: 1; flex-direction: column; overflow: auto; }
.oh-game-document-body > header { display: flex; flex: none; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; padding: 23px 26px 20px; border-bottom: 1px solid var(--os-border); }
.oh-game-document-body > header h2 { margin: 0; color: var(--dsw-alias-label-primary); font-size: 19px; font-weight: 550; line-height: 1.5; }
.oh-game-document-body > header > div:last-child { display: flex; align-items: center; gap: 6px; }
.oh-game-draft-label { display: block; margin-top: 8px; color: var(--dsw-alias-label-secondary); font-size: 10px; }
.oh-game-document-body > textarea { display: block; box-sizing: border-box; width: 100%; min-height: 240px; flex: 1; resize: none; border: 0; padding: 24px 28px 40px; color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-base); font: 13px/1.9 var(--dsw-font-family); outline-offset: -3px; }
.oh-game-document-body > .oh-story-markdown { min-width: 0; overflow: visible; padding: 24px 28px 35px; font-size: 13px; }
.oh-game-document-source { flex: none; padding: 15px 27px 20px; border-top: 1px solid var(--os-border); color: var(--dsw-alias-label-secondary); font-size: 10px; }
.oh-game-document-source summary { cursor: pointer; }
.oh-game-document-source code { display: block; margin-top: 12px; overflow-wrap: anywhere; }
.oh-game-doc-picker { display: none; }
.oh-game-create-empty { display: flex; min-height: 0; flex: 1; overflow: auto; flex-direction: column; align-items: center; justify-content: center; box-sizing: border-box; gap: 17px; padding: 35px; color: var(--dsw-alias-label-secondary); background: var(--dsw-alias-bg-layer-1); text-align: center; }
.oh-game-create-empty > span { display: grid; width: 64px; height: 64px; place-items: center; border: 1px solid var(--os-border); border-radius: 18px; color: var(--dsw-alias-state-business-primary); background: var(--dsw-alias-bg-base); font-size: 31px; }
.oh-game-create-empty > small { font-size: 11px; }
.oh-game-create-empty h2 { margin: 0; color: var(--dsw-alias-label-primary); font-weight: 500; font-size: 24px; line-height: 1.8; }
.oh-game-create-empty p { margin: 0; font-size: 12px; line-height: 2; }
.oh-game-create-empty > div { display: flex; justify-content: center; flex-wrap: wrap; gap: 9px; }
.oh-game-create-empty .oh-game-primary { padding: 8px 15px; border-color: var(--dsw-alias-state-business-primary); color: var(--dsw-alias-static-white, white); background: var(--dsw-alias-state-business-primary); }
.oh-game-studio[data-oh-game-narrow] .oh-game-play-panel { gap: 12px; padding: 15px 10px 10px; }
.oh-game-studio[data-oh-game-narrow] .oh-game-documents { flex-direction: column; }
.oh-game-studio[data-oh-game-narrow] .oh-game-documents > nav { display: none; }
.oh-game-studio[data-oh-game-narrow] .oh-game-doc-picker { display: flex; flex: none; align-items: center; gap: 8px; padding: 10px; color: var(--dsw-alias-label-secondary); font-size: 10px; }
.oh-game-doc-picker select { width: 100%; min-width: 0; flex: 1; border: 1px solid var(--os-border); border-radius: 5px; padding: 5px; color: var(--dsw-alias-label-primary); background: var(--dsw-alias-bg-base); font: inherit; }
.oh-game-studio[data-oh-game-narrow] .oh-game-document-body > header { padding: 15px 13px; }
.oh-game-studio[data-oh-game-narrow] .oh-game-document-body > header h2 { font-size: 16px; }
.oh-game-studio[data-oh-game-narrow] .oh-game-document-body > textarea,
.oh-game-studio[data-oh-game-narrow] .oh-game-document-body > .oh-story-markdown { padding: 18px 13px; }
/* \u5236\u4F5C/\u5BF9\u8BDD owns this state below 720px and floats beside the workbench tabs. */
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-toolbar-actions { display: none; }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-toolbar { min-height: 0; padding: 9px 10px; gap: 7px 9px; }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-toolbar > .oh-workbench-cluster { width: calc(100% - 128px); }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-studio[data-oh-game-narrow] .oh-game-toolbar { min-height: 0; padding: 51px 10px 9px; gap: 7px 9px; }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-studio[data-oh-game-narrow] .oh-game-toolbar > .oh-workbench-cluster { width: 100%; }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-mode-tabs button,
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-tabs button { min-height: 31px; }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-project { min-width: 0; max-width: none; }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-project select { min-height: 32px; }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-play-panel > .oh-game-preview-shell { grid-template-rows: 40px minmax(0, 1fr); }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-play-panel > .oh-game-preview-shell[data-update="pending"] { grid-template-rows: auto 40px minmax(0, 1fr); }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-preview-status button { min-height: 28px; }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-preview-status { gap: 5px; padding-inline: 7px; }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-studio[data-oh-game-narrow] .oh-game-preview-status { flex-wrap: wrap; align-content: center; padding-block: 4px; }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-studio[data-oh-game-narrow] .oh-game-preview-shell { grid-template-rows: 72px minmax(0, 1fr); }
[data-conversation-scroll][data-oh-story-workbench="game"][data-oh-story-layout="compact"] .oh-game-studio[data-oh-game-narrow] .oh-game-preview-shell[data-update="pending"] { grid-template-rows: auto 72px minmax(0, 1fr); }

.oh-story-context-fallback { position:fixed;z-index:30;left:18px;bottom:18px;box-sizing:border-box;width:min(400px,calc(100vw - 36px));max-height:45dvh;overflow:auto;padding:16px;border:1px solid var(--dsw-alias-border-l2,#dbe2ed);border-radius:10px;box-shadow:0 8px 32px rgb(0 0 0 / 14%);color:var(--dsw-alias-label-primary,#222);background:var(--dsw-alias-bg-base,#fff);font:12px/1.8 var(--dsw-font-family,system-ui); }
.oh-story-context-fallback header { display:flex;align-items:center;justify-content:space-between;gap:15px; }.oh-story-context-fallback strong { font-size:13px; }.oh-story-context-fallback button { cursor:pointer;border:1px solid var(--dsw-alias-border-l2,#dbe2ed);border-radius:5px;padding:4px 9px;color:inherit;background:var(--dsw-alias-bg-layer-1,#f6f7fa);font:inherit; }.oh-story-context-fallback header button { border:0;background:transparent;font-size:18px; }.oh-story-context-fallback p { margin:9px 0;color:var(--dsw-alias-label-secondary,#697386); }.oh-story-context-fallback summary { margin-top:10px;cursor:pointer; }.oh-story-context-fallback pre { white-space:pre-wrap;overflow-wrap:anywhere;font:inherit; }.oh-story-context-fallback button:focus-visible,.oh-story-context-fallback summary:focus-visible { outline:2px solid var(--dsw-alias-state-business-primary,#668be3);outline-offset:2px; }
`;var gn=`.oh-story-role { display: flex; flex-direction: column; margin: 0; overflow: hidden; }
.oh-story-role summary {
  display: flex;
  min-height: 24px;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0;
  cursor: pointer;
  list-style: none;
  font-size: 14px;
  line-height: 24px;
}
.oh-story-role summary::-webkit-details-marker { display: none; }
.oh-story-role summary span { color: var(--dsw-alias-state-business-primary); }
.oh-story-role summary strong { margin-right: auto; color: var(--dsw-alias-label-secondary); font-weight: 500; }
.oh-story-role summary em { color: var(--dsw-alias-label-caption); font-style: normal; font-size: 12px; }
.oh-story-role[data-state="error"] summary em { color: var(--dsw-alias-state-error-primary); }
.oh-story-role pre {
  max-height: 260px;
  overflow: auto;
  margin: 4px 0 4px 4px;
  padding: 12px 16px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 12px;
  color: var(--dsw-alias-label-secondary);
  background: var(--dsw-alias-markdown-code-block);
  white-space: pre-wrap;
  font: var(--dsw-font-markdown-code-block-small);
}
.oh-story-role button {
  align-self: flex-start;
  margin: 4px 0 2px 4px;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 999px;
  color: var(--dsw-alias-label-secondary);
  background: var(--dsw-alias-bg-base);
  padding: 3px 9px;
  cursor: pointer;
  font: inherit;
  font-size: 11px;
}
.oh-story-role button:hover { color: var(--dsw-alias-label-primary); background: var(--dsw-alias-interactive-bg-hover); }
.oh-story-role button:focus-visible { outline: 2px solid var(--dsw-alias-state-business-primary); outline-offset: -2px; }
`;var l=require("react/jsx-runtime"),yt=[mn,Gr,Lr].join(`
`),yn=wr(So()),Jr="oh-story",Kr=["slots","sessions","conversation"],vn=new qo;function de(e,o){return typeof o=="function"?o(e):o}var Yr=new Map,Id=[];function Nd(){return(0,Ur.defineStore)({init:()=>({buffers:{},workbenchPreference:void 0,editorMode:"preview",dramaPane:"canvas",dramaFilesOpen:!1,dramaChatOpen:!1,dramaEpisode:void 0,expanded:{},selected:void 0,workbench:"story",gameTab:"preview",gameChatOpen:!0,gameCanvas:{},gameProjectId:void 0,gamePane:"studio",videoTab:"preview",videoChatOpen:!1,videoCanvas:{},videoProjectId:void 0,videoPane:"studio",productionSection:"canvas",productionSelectedIds:{},productionJobs:{},productionSelections:{},productionReferences:{},productionSequence:{},productionCanvas:{},productionViewport:{},productionIntentCalls:{},settledMutation:void 0,hydrated:!1}),actions:{restore:(e,o)=>{o!==void 0&&(Object.assign(e,o),e.buffers=Object.fromEntries(Object.entries(o.buffers).map(([t,n])=>[t,{...n,saving:void 0}]))),e.hydrated=!0},setSettledMutation:(e,o)=>{e.settledMutation=o},setBuffers:(e,o)=>{e.buffers=de(e.buffers,o)},setWorkbenchPreference:(e,o)=>{e.workbenchPreference=de(e.workbenchPreference,o)},setEditorMode:(e,o)=>{e.editorMode=de(e.editorMode,o)},setDramaPane:(e,o)=>{e.dramaPane=o},setDramaFilesOpen:(e,o)=>{e.dramaFilesOpen=o},setDramaChatOpen:(e,o)=>{e.dramaChatOpen=o},setDramaEpisode:(e,o)=>{e.dramaEpisode=o},setExpanded:(e,o)=>{e.expanded=de(e.expanded,o)},setSelected:(e,o)=>{e.selected=de(e.selected,o)},setWorkbench:(e,o)=>{e.workbench=de(e.workbench,o)},setGameTab:(e,o)=>{e.gameTab=de(e.gameTab,o)},setGameChatOpen:(e,o)=>{e.gameChatOpen=o},setGameCanvas:(e,o)=>{e.gameCanvas=de(e.gameCanvas,o)},setGameProjectId:(e,o)=>{e.gameProjectId=de(e.gameProjectId,o)},setGamePane:(e,o)=>{e.gamePane=de(e.gamePane,o)},setVideoTab:(e,o)=>{e.videoTab=de(e.videoTab,o)},setVideoChatOpen:(e,o)=>{e.videoChatOpen=o},setVideoCanvas:(e,o)=>{e.videoCanvas=de(e.videoCanvas,o)},setVideoProjectId:(e,o)=>{e.videoProjectId=de(e.videoProjectId,o)},setVideoPane:(e,o)=>{e.videoPane=de(e.videoPane,o)},setProductionSection:(e,o)=>{e.productionSection=de(e.productionSection,o)},setProductionSelectedIds:(e,o)=>{e.productionSelectedIds=de(e.productionSelectedIds,o)},setProductionJobs:(e,o)=>{e.productionJobs=de(e.productionJobs,o)},setProductionSelections:(e,o)=>{e.productionSelections=de(e.productionSelections,o)},setProductionReferences:(e,o)=>{e.productionReferences=de(e.productionReferences,o)},setProductionSequence:(e,o)=>{e.productionSequence=de(e.productionSequence,o)},setProductionCanvas:(e,o)=>{e.productionCanvas=de(e.productionCanvas,o)},setProductionViewport:(e,o)=>{e.productionViewport=de(e.productionViewport,o)},setProductionIntentCalls:(e,o)=>{e.productionIntentCalls=de(e.productionIntentCalls,o)}}})}var bt=class extends Error{constructor(t,n){super(n);this.status=t}status},Td={story:["\u77ED\u7BC7","\u6B63\u6587","\u5927\u7EB2","\u8BBE\u5B9A","\u8FFD\u8E2A","\u5BF9\u6807","\u53C2\u8003\u8D44\u6599"],drama:["\u9879\u76EE","\u8F93\u5165","\u9879\u76EE\u5F00\u53D1","\u8BBE\u5B9A\u96C6","\u5267\u96C6","\u5BA1\u67E5","\u521B\u4F5C\u8005\u51B3\u7B56","\u4EA4\u4ED8"],game:["game-adaptations"],video:["video-recaps"]},Br=["preview","source","production"];function fn(e){return e==="short-drama.json"?"\u9879\u76EE":oa.has(e)?"\u77ED\u7BC7":e.split("/",1)[0]??"\u5176\u4ED6"}async function No(e){let o=await e.json();if(!e.ok)throw new bt(e.status,o.error??`HTTP ${String(e.status)}`);return o}function Qr({nodes:e,depth:o,expanded:t,selected:n,activityPath:a,onToggle:r,onSelect:s}){return(0,l.jsx)(l.Fragment,{children:e.map(i=>{if(i.kind==="file")return(0,l.jsx)("button",{type:"button",style:{"--oh-story-indent":`${String(o*14)}px`},title:i.path,"aria-label":i.path,"data-file-path":i.path,"data-agent-target":i.path===a||void 0,"aria-current":i.path===n?"page":void 0,onClick:()=>{s(i.path)},children:i.name},i.path);let g=n?.startsWith(`${i.path}/`)===!0||t[i.path]===!0;return(0,l.jsxs)("details",{className:"oh-story-file-folder",open:g,onToggle:m=>{r(i.path,m.currentTarget.open)},children:[(0,l.jsxs)("summary",{style:{"--oh-story-indent":`${String(o*14)}px`},title:i.path,children:[i.name,(0,l.jsx)("span",{children:i.fileCount})]}),(0,l.jsx)(Qr,{nodes:i.children,depth:o+1,expanded:t,selected:n,activityPath:a,onToggle:r,onSelect:s})]},i.path)})})}var Ed=4e3;function Rd(e,o){let[t,n]=(0,k.useState)(0),[a,r]=(0,k.useState)(),[s,i]=(0,k.useState)(),[g,m]=(0,k.useState)(!0),c=(0,k.useRef)(void 0),f=(0,k.useRef)(void 0),I=(0,k.useCallback)(()=>{m(!0),n(w=>w+1)},[]);return(0,k.useEffect)(()=>{let w=new AbortController;return f.current=w,fetch(he("workspace",e),{signal:w.signal}).then(u=>No(u)).then(u=>{i(void 0);let b=JSON.stringify(u);b!==c.current&&(c.current=b,r(u))}).catch(u=>{w.signal.aborted||i(u instanceof Error?u.message:String(u))}).finally(()=>{f.current===w&&(f.current=void 0),w.signal.aborted||m(!1)}),()=>{w.abort()}},[e,t]),(0,k.useEffect)(()=>{if(!o)return;let w=globalThis.setInterval(()=>{f.current!==void 0||globalThis.document.visibilityState==="hidden"||n(u=>u+1)},Ed);return()=>{globalThis.clearInterval(w)}},[o]),{workspace:a,error:s,loading:g,reload:I}}function Dd({href:e,onResult:o}){let t=(0,k.useRef)(o);return(0,k.useEffect)(()=>{t.current=o},[o]),(0,k.useEffect)(()=>{let n=new AbortController;return fetch(e,{signal:n.signal}).then(a=>{if(n.signal.aborted)return;let r=a.headers.get("content-type")??"";t.current(e,a.ok&&r.includes("text/html")?"ok":"failed")}).catch(()=>{n.signal.aborted||t.current(e,"failed")}),()=>{n.abort()}},[e]),null}function $d({project:e,building:o,onDiscuss:t}){let n=(0,k.useRef)(null),a=(0,k.useRef)(null),r=(0,k.useRef)(!1),[s,i]=(0,k.useState)(!1),[g,m]=(0,k.useState)(!1),[c,f]=(0,k.useState)(!1),[I,w]=(0,k.useState)(),[u,b]=(0,k.useState)(0),R=(0,k.useRef)(e);e.previewReady&&(R.current=e);let[C,T]=(0,k.useState)(e.previewReady?e.previewVersion:void 0),O=C??e.previewVersion;(0,k.useEffect)(()=>{e.previewReady&&C===void 0&&T(e.previewVersion)},[C,e.previewReady,e.previewVersion]);let[Q,X]=(0,k.useState)("desktop");(0,k.useEffect)(()=>{let K=n.current?.ownerDocument;if(K===void 0)return;let N=()=>{K.fullscreenElement!==null||!r.current||(r.current=!1,a.current?.focus())};return K.addEventListener("fullscreenchange",N),()=>{K.removeEventListener("fullscreenchange",N)}},[]);let ge=R.current;if(!ge.previewReady||ge.previewUrl===void 0)return(0,l.jsxs)("div",{className:"oh-game-preview-empty",children:[(0,l.jsx)("span",{"aria-hidden":!0,children:"\u25EB"}),(0,l.jsx)("strong",{children:"\u8FD8\u6CA1\u6709\u53EF\u8BD5\u73A9\u7248\u672C"}),(0,l.jsx)("p",{children:"\u6545\u4E8B\u5DF2\u7ECF\u6709\u4E86\u8F6E\u5ED3\u3002\u53EF\u4EE5\u7EE7\u7EED\u5B8C\u5584\u521B\u4F5C\u8BBE\u5B9A\uFF0C\u4E5F\u53EF\u4EE5\u5148\u505A\u4E00\u5C0F\u6BB5\u80FD\u73A9\u7684\u4F53\u9A8C\u3002"}),(0,l.jsx)("button",{type:"button",onClick:t,children:"\u548C AI \u505A\u4E00\u6BB5\u8BD5\u73A9"}),(0,l.jsxs)("div",{className:"oh-game-prompt-example",children:[(0,l.jsx)("span",{children:"\u63CF\u8FF0\u793A\u4F8B"}),(0,l.jsx)("q",{children:"\u628A\u300A\u4F5C\u54C1\u540D\u300B\u6539\u7F16\u6210\u7F51\u9875\u4E92\u52A8\u6E38\u620F\uFF0C\u76EE\u6807\u73A9\u5BB6\u662F\u2026\u2026\uFF0C\u6838\u5FC3\u73A9\u6CD5\u662F\u2026\u2026\uFF0C\u5E0C\u671B\u6574\u4F53\u98CE\u683C\u2026\u2026"})]})]});let ee=Hr(ge.previewUrl,O,u,globalThis.location.origin),ve=e.previewReady&&e.previewVersion!==O,q=()=>{m(!1),f(!1),T(e.previewVersion),b(K=>K+1)},$=()=>{m(!1),f(!1),b(K=>K+1)},W=Fr({frameLoaded:g,frameError:c,probe:I?.href===ee.probeHref?I.result:"pending",building:o,pending:ve,isolated:ee.isolated}),H=W.label,Pe=()=>{let K=n.current;K!==null&&(r.current=!0,K.requestFullscreen().catch(()=>{r.current=!1}))};return(0,l.jsxs)("div",{ref:n,className:"oh-game-preview-shell","data-state":W.tone,"data-device":Q,"data-update":ve&&!o?"pending":void 0,children:[ve&&!o&&(0,l.jsxs)("div",{className:"oh-game-new-version",role:"status",children:[(0,l.jsxs)("div",{children:[(0,l.jsx)("strong",{children:"\u65B0\u7684\u8BD5\u73A9\u7248\u672C\u5DF2\u51C6\u5907\u597D"}),(0,l.jsx)("span",{children:"\u53EF\u4EE5\u5148\u73A9\u5B8C\u8FD9\u91CC\uFF0C\u518D\u9009\u62E9\u8F7D\u5165\u66F4\u65B0\u3002"})]}),(0,l.jsx)("button",{type:"button",onClick:q,children:"\u8F7D\u5165\u65B0\u7248\u672C"})]}),(0,l.jsxs)("div",{className:"oh-game-preview-status",children:[(0,l.jsxs)("span",{className:"oh-game-runtime-state",role:"status","aria-live":"polite",title:H,children:[(0,l.jsx)("i",{"aria-hidden":!0}),(0,l.jsx)("em",{children:H})]}),(0,l.jsx)("span",{className:"oh-game-focus-hint","data-focused":s||void 0,children:s?"\u6E38\u620F\u6B63\u5728\u63A5\u6536\u952E\u9F20\u8F93\u5165":"\u70B9\u51FB\u753B\u9762\u8FDB\u5165\u8BD5\u73A9"}),(0,l.jsxs)("div",{children:[(0,l.jsx)("button",{type:"button",className:"oh-game-device","aria-label":"\u684C\u9762\u9884\u89C8","aria-pressed":Q==="desktop",onClick:()=>{X("desktop")},children:(0,l.jsxs)("svg",{width:"14",height:"14",viewBox:"0 0 20 20",fill:"none",stroke:"currentColor",strokeWidth:"1.4","aria-hidden":!0,children:[(0,l.jsx)("rect",{x:"2",y:"3",width:"16",height:"11",rx:"1"}),(0,l.jsx)("path",{d:"M10 14v3M6 17h8"})]})}),(0,l.jsx)("button",{type:"button",className:"oh-game-device","aria-label":"\u624B\u673A\u9884\u89C8","aria-pressed":Q==="phone",onClick:()=>{X("phone")},children:(0,l.jsxs)("svg",{width:"14",height:"14",viewBox:"0 0 20 20",fill:"none",stroke:"currentColor",strokeWidth:"1.4","aria-hidden":!0,children:[(0,l.jsx)("rect",{x:"6",y:"2",width:"8",height:"16",rx:"1"}),(0,l.jsx)("path",{d:"M9 15h2"})]})}),(0,l.jsxs)("button",{className:"oh-game-reload",type:"button",disabled:ve||o||!e.previewReady,title:ve?"\u8BF7\u901A\u8FC7\u8F7D\u5165\u65B0\u7248\u672C\u66F4\u65B0\u8BD5\u73A9":void 0,onClick:$,"aria-label":"\u91CD\u65B0\u8F7D\u5165\u6E38\u620F",children:[(0,l.jsx)("span",{"aria-hidden":!0,children:"\u21BB"}),(0,l.jsx)("b",{children:"\u5237\u65B0"})]}),(0,l.jsx)("button",{ref:a,type:"button",onClick:Pe,children:"\u5168\u5C4F\u8BD5\u73A9"})]})]}),(0,l.jsx)(Dd,{href:ee.probeHref,onResult:(K,N)=>{w({href:K,result:N})}}),(0,l.jsx)("iframe",{src:ee.href,title:`\u300A${e.title}\u300B\u53EF\u8BD5\u73A9\u9884\u89C8`,sandbox:ee.isolated?"allow-scripts allow-same-origin allow-forms allow-modals allow-downloads":"allow-scripts allow-forms allow-modals allow-downloads",allow:"autoplay; fullscreen; gamepad",allowFullScreen:!0,referrerPolicy:"no-referrer",onLoad:()=>{m(!0)},onError:()=>{m(!1),f(!0)},onFocus:()=>{i(!0)},onBlur:()=>{i(!1)}},`${e.id}:${O}:${String(u)}`)]})}function Md({workspace:e,building:o,gameTab:t,gameProjectId:n,hidden:a,onGameTab:r,onGameProject:s,paneId:i,labelledBy:g,onWorkbench:m,workbenchModes:c,onWorkbenchSettings:f,onCollapse:I,editor:w,canvasByProject:u,onCanvasChange:b,chatOpen:R,onChatOpen:C,onContinueInChat:T}){let O=n===""?void 0:e.games.find(W=>W.id===n)??e.games[0],Q=(0,k.useRef)(null),X=(0,k.useId)();(0,k.useLayoutEffect)(()=>{let W=Q.current;if(W===null)return;let H=()=>{W.toggleAttribute("data-oh-game-narrow",W.clientWidth<=340)};H();let Pe=new ResizeObserver(H);return Pe.observe(W),()=>{Pe.disconnect()}},[]),(0,k.useEffect)(()=>{O!==void 0&&O.id!==n&&s(O.id)},[n,s,O]),(0,k.useEffect)(()=>{if(a||O===void 0||t!=="design"||w.selected?.startsWith(`${O.root}/`)===!0)return;let W=Io(O,e.files)[0]?.path;W!==void 0&&w.onSelect(W)},[w.selected,t,a,O?.id,e.files]);let ge=W=>{if(r(W),W==="canvas"&&C(!1),W==="design"&&O!==void 0&&w.selected?.startsWith(`${O.root}/`)!==!0){let H=Io(O,e.files)[0]?.path;H!==void 0&&w.onSelect(H)}},ee=Object.fromEntries(Object.entries(w.buffers).filter(([,W])=>W.missing!==!0).map(([W,H])=>[W,H.content])),ve=O===void 0||Io(O,e.files).every(({path:W})=>w.buffers[W]!==void 0||w.errors[W]!==void 0),q={preview:"\u8BD5\u73A9",canvas:"\u521B\u4F5C\u753B\u5E03",design:"\u6587\u7A3F"},$=["preview","canvas","design"];return(0,l.jsxs)("main",{ref:Q,id:i,className:"oh-game-studio",role:"tabpanel","aria-labelledby":g,hidden:a,children:[(0,l.jsxs)("header",{className:"oh-game-toolbar",children:[(0,l.jsxs)("div",{className:"oh-workbench-cluster",children:[(0,l.jsx)(ko,{className:"oh-game-mode-tabs",current:"game",modes:c,onSelect:m}),(0,l.jsx)(Po,{onClick:f}),(0,l.jsx)("button",{className:"oh-workbench-collapse",type:"button",title:"\u6536\u8D77\u521B\u4F5C\u5DE5\u4F5C\u53F0","aria-label":"\u6536\u8D77\u521B\u4F5C\u5DE5\u4F5C\u53F0",onClick:I,children:"\xD7"})]}),(0,l.jsxs)("label",{className:"oh-game-project",title:"\u5207\u6362\u9879\u76EE\u5C06\u91CD\u65B0\u8F7D\u5165\u8BD5\u73A9",children:[(0,l.jsx)("span",{children:"\u6E38\u620F\u9879\u76EE"}),(0,l.jsxs)("select",{"aria-label":"\u6E38\u620F\u9879\u76EE\uFF1B\u5207\u6362\u5C06\u91CD\u65B0\u8F7D\u5165\u8BD5\u73A9",value:O?.id??"",onChange:W=>{s(W.target.value)},children:[(0,l.jsx)("option",{value:"",children:"\u65B0\u5EFA\u6E38\u620F\u60F3\u6CD5"}),e.games.length>0&&(0,l.jsx)("optgroup",{label:"\u6211\u7684\u9879\u76EE",children:e.games.map(W=>(0,l.jsx)("option",{value:W.id,children:`\u6211\u7684\u9879\u76EE \xB7 ${W.title}`},W.id))})]})]}),(0,l.jsx)("div",{className:"oh-game-tabs",role:"tablist","aria-label":"\u6E38\u620F\u5DE5\u4F5C\u53F0",children:$.map(W=>(0,l.jsx)("button",{type:"button",role:"tab",tabIndex:t===W?0:-1,"aria-selected":t===W,id:`${X}-${W}-tab`,"aria-controls":`${X}-${W}-panel`,onKeyDown:H=>{We(H,$,t,ge)},onClick:()=>{ge(W)},children:q[W]},W))}),(0,l.jsx)("div",{className:"oh-game-toolbar-actions",children:(0,l.jsx)("button",{type:"button",className:"oh-game-chat-toggle","aria-label":R?"\u6536\u8D77\u539F\u751F Chat":"\u5C55\u5F00\u539F\u751F Chat","aria-expanded":R,onClick:()=>{C(!R)},children:"Chat"})})]}),O===void 0?(0,l.jsxs)("div",{className:"oh-game-create-empty",children:[(0,l.jsx)("span",{"aria-hidden":!0,children:"\u25EB"}),(0,l.jsx)("small",{children:"\u4E00\u4E2A\u6545\u4E8B\uFF0C\u53EF\u4EE5\u6709\u5F88\u591A\u79CD\u73A9\u6CD5"}),(0,l.jsx)("h2",{children:"\u628A\u4F60\u7684\u6545\u4E8B\uFF0C\u53D8\u6210\u80FD\u73A9\u7684\u4E16\u754C\u3002"}),(0,l.jsxs)("p",{children:["\u5E26\u6765\u4E00\u90E8\u5C0F\u8BF4\u3001\u4E00\u4E2A\u4EBA\u7269\uFF0C\u6216\u8005\u4E00\u4E2A\u521A\u5192\u51FA\u6765\u7684\u5FF5\u5934\u3002",(0,l.jsx)("br",{}),"\u5148\u804A\u804A\u4F60\u5E0C\u671B\u73A9\u5BB6\u7ECF\u5386\u4EC0\u4E48\u3002"]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("button",{type:"button",onClick:()=>{T("\u6211\u60F3\u505A\u4E00\u6BB5\u53EF\u4EE5\u9009\u62E9\u7ED3\u5C40\u7684\u6545\u4E8B\uFF0C\u5148\u804A\u804A\u73A9\u5BB6\u4F1A\u7ECF\u5386\u4EC0\u4E48\u3002")},children:"\u4E00\u6BB5\u53EF\u4EE5\u9009\u62E9\u7684\u6545\u4E8B"}),(0,l.jsx)("button",{type:"button",onClick:()=>{T("\u6211\u60F3\u56F4\u7ED5\u5C0F\u8BF4\u91CC\u7684\u4EBA\u7269\u505A\u4E00\u6B3E\u8F7B\u7B56\u7565\u6E38\u620F\uFF0C\u5148\u548C\u6211\u8BA8\u8BBA\u6838\u5FC3\u73A9\u6CD5\u3002")},children:"\u56F4\u7ED5\u4EBA\u7269\u7684\u8F7B\u7B56\u7565"}),(0,l.jsx)("button",{type:"button",onClick:()=>{T("\u6211\u60F3\u628A\u5C0F\u8BF4\u91CC\u7684\u5730\u70B9\u505A\u6210\u53EF\u4EE5\u63A2\u7D22\u7684\u4E16\u754C\uFF0C\u5148\u8BA8\u8BBA\u53EF\u73A9\u7684\u4F53\u9A8C\u3002")},children:"\u53EF\u4EE5\u63A2\u7D22\u7684\u4E16\u754C"})]}),(0,l.jsx)("button",{type:"button",className:"oh-game-primary",onClick:()=>{T("\u6211\u6709\u4E00\u4E2A\u6E38\u620F\u60F3\u6CD5\uFF0C\u60F3\u5148\u804A\u804A\u6545\u4E8B\u548C\u73A9\u5BB6\u7684\u4F53\u9A8C\u3002")},children:"\u548C AI \u8BA8\u8BBA\u6E38\u620F\u60F3\u6CD5"})]}):(0,l.jsxs)("div",{className:"oh-game-panels",children:[(0,l.jsx)("div",{className:"oh-game-panel oh-game-play-panel",role:"tabpanel",id:`${X}-preview-panel`,"aria-labelledby":`${X}-preview-tab`,hidden:t!=="preview",children:(0,l.jsx)($d,{project:O,building:o,onDiscuss:()=>{T(`\u5148\u628A\u300C${O.title}\u300D\u505A\u6210\u4E00\u5C0F\u6BB5\u53EF\u4EE5\u73A9\u7684\u4F53\u9A8C\uFF0C\u8BF7\u5148\u548C\u6211\u6838\u5BF9\u6545\u4E8B\u3001\u73A9\u6CD5\u548C\u8303\u56F4\u3002`)}},O.id)}),(0,l.jsx)("div",{className:"oh-game-panel",role:"tabpanel",id:`${X}-canvas-panel`,"aria-labelledby":`${X}-canvas-tab`,hidden:t!=="canvas",children:ve?(0,l.jsx)(_r,{project:O,files:e.files,documents:ee,state:u[O.id]??jr,onChange:W=>{b(O.id,W)},onOpenDocument:W=>{w.onSelect(W),r("design"),w.onMode("preview")},onContinueInChat:(W,H)=>{T(`\u6211\u60F3\u7EE7\u7EED\u8BA8\u8BBA\u300C${W}\u300D\u3002${H===void 0?"":`\u6587\u7A3F\uFF1A${H}`} \u8BF7\u5148\u548C\u6211\u8BA8\u8BBA\u73A9\u5BB6\u4F53\u9A8C\uFF0C\u4E0D\u76F4\u63A5\u5F00\u59CB\u5236\u4F5C\u3002`)},onPlay:()=>{r("preview")}},O.id):(0,l.jsx)("div",{className:"oh-game-design-empty",role:"status",children:"\u6B63\u5728\u6574\u7406\u521B\u4F5C\u753B\u5E03\u2026"})}),(0,l.jsx)("div",{className:"oh-game-panel",role:"tabpanel",id:`${X}-design-panel`,"aria-labelledby":`${X}-design-tab`,hidden:t!=="design",children:(0,l.jsx)(zr,{project:O,files:e.files,editor:w,onChat:T})})]})]})}function Od({sessionId:e,runningCalls:o,partial:t,undispatched:n,settledMutation:a,settledMutationTurn:r,liveTurn:s,sessionRunning:i,productionQueue:g,productionIntents:m,sendProductionPrompt:c,focusProductionChat:f,cancelProduction:I,removeQueuedProduction:w,workspace:u,workbench:b,workbenchModes:R,error:C,workspaceLoading:T,reload:O,open:Q,workbenchAvailable:X,welcome:ge,welcomeSaving:ee,onDismissWelcome:ve,useStore:q,actions:$}){let W=(0,k.useMemo)(()=>ra(o,t,n),[t,o,n]),H=(0,k.useMemo)(()=>W.flatMap(d=>{let p=Vo(d.path,u?.cwd);return p===void 0?[]:[{activity:d,path:p}]}),[W,u?.cwd]),Pe=H.at(-1),K=(0,k.useMemo)(()=>new Set(H.map(d=>d.path)),[H]),N=(0,k.useRef)(K);N.current=K;let j=a===void 0?void 0:Vo(a.slice(a.indexOf("\0")+1),u?.cwd),z=Pe?.activity,B=Pe?.path,[re,oe]=(0,k.useState)(!1),se=$.setWorkbench,xe=q(d=>d.gameTab),Oe=q(d=>d.gameChatOpen),ae=q(d=>d.gameCanvas),Ee=$.setGameTab,Ce=q(d=>d.gameProjectId),we=$.setGameProjectId,Re=q(d=>d.gamePane),Ve=$.setGamePane,Ie=q(d=>d.videoTab),Be=$.setVideoTab,co=q(d=>d.videoProjectId),Xe=$.setVideoProjectId,je=q(d=>d.videoChatOpen),P=q(d=>d.videoPane),Ne=$.setVideoPane,Ue=q(d=>d.videoCanvas),De=q(d=>d.dramaPane),v=q(d=>d.dramaFilesOpen),M=q(d=>d.dramaChatOpen),F=q(d=>d.dramaEpisode),te=b==="drama"&&De==="canvas",S=q(d=>d.selected),le=$.setSelected,fe=q(d=>d.buffers),ne=$.setBuffers,Le=(0,k.useRef)({}),To=q(d=>d.expanded),ce=$.setExpanded,[Ae,uo]=(0,k.useState)(),[eo,vt]=(0,k.useState)(),[oi,ti]=(0,k.useState)(0),[ni,xn]=(0,k.useState)({}),Je=Ce===""?void 0:u?.games.find(d=>d.id===Ce)??u?.games[0],ai=(0,k.useMemo)(()=>Je===void 0?[]:Io(Je,u?.files??[]),[Je,u?.files]),ho=u?.videos.find(d=>d.id===co)??u?.videos[0],ri=(0,k.useMemo)(()=>ho===void 0?[]:po(ho),[ho]),wn=b==="video"?ri:ai;(0,k.useEffect)(()=>{if(b!=="video"&&(b!=="game"||Je===void 0))return;let d=wn.filter(({path:y})=>{let x=Le.current[y],D=u?.files.find(A=>A.path===y);return!K.has(y)&&(x===void 0||x.source==="agent"||x.version!==D?.version&&x.content===x.saved)});if(d.length===0)return;let p=new AbortController;return Promise.all(d.map(async({path:y})=>{try{let x=await No(await fetch(he("file",e,y),{signal:p.signal}));if(p.signal.aborted)return;ne(D=>{let A=D[y];return A?.source==="human"&&A.content!==A.saved||N.current.has(y)?D:{...D,[y]:{content:x.content,saved:x.content,source:"disk",version:x.version}}}),xn(D=>{let A={...D};return delete A[y],A})}catch(x){p.signal.aborted||xn(D=>({...D,[y]:x instanceof Error?x.message:String(x)}))}})),()=>{p.abort()}},[Je?.id,ho?.id,K,wn,oi,e,ne,b,u?.files]);let ii=q(d=>d.productionSection),mo=$.setProductionSection,si=q(d=>d.productionSelectedIds),di=q(d=>d.productionJobs),li=q(d=>d.productionSelections),ci=q(d=>d.productionReferences),ui=q(d=>d.productionSequence),pi=q(d=>d.productionCanvas),hi=q(d=>d.productionViewport),kn=q(d=>d.productionIntentCalls),oo=(0,k.useRef)(null),xt=(0,k.useRef)(!1);(0,k.useLayoutEffect)(()=>{if(!xt.current)return;xt.current=!1;let d=oo.current?.querySelectorAll('[role="tablist"][aria-label="\u521B\u4F5C\u5DE5\u4F5C\u53F0"] [role="tab"][aria-selected="true"]');Array.from(d??[]).find(p=>p.getClientRects().length>0)?.focus()},[b]);let Cn=$.setWorkbenchPreference,Eo=(0,k.useCallback)(d=>{Cn(d);let p=So();(X||dn(p,u?.cwd)!==void 0)&&Tr(p,u?.cwd,d)},[X,Cn,u?.cwd]),Ge=(0,k.useId)(),wt=`${Ge}-studio-panel`,kt=`${Ge}-video-studio-panel`,Ct=`${Ge}-chat-panel`,Pn=(0,k.useRef)(null),Bo=(0,k.useRef)(new Map),Sn=(0,k.useRef)(new Set),In=q(d=>d.settledMutation),Nn=(0,k.useRef)(new Set);s!==void 0&&Nn.current.add(s);let Pt=(0,k.useRef)(new Set),$e=S===void 0?void 0:fe[S],to=u?.files.find(d=>d.path===S),no=to?.kind==="media",mi=$e?.source==="human"&&$e.content!==$e.saved,St=$e?.saving===!0,Tn=$e?.error,ao=$e?.conflict,It=S?.toLocaleLowerCase(),Nt=It?.endsWith(".md")===!0,En=It?.endsWith(".jsonl")===!0,Rn=En||It?.endsWith(".json")===!0,Uo=Nt||En,Jo=(0,k.useMemo)(()=>[...new Set((u?.files??[]).filter(d=>jt(d.path)).flatMap(d=>{let p=vo(d.path);return p===void 0?[]:[p]}))].sort(),[u?.files]),Dn=vo(S),L=b==="drama"?F!==void 0&&Jo.includes(F)?F:Dn??Jo[0]:Dn,go=L!==void 0&&(b==="drama"||S!==void 0&&jt(S)),$n=go?Br:Br.filter(d=>d!=="production"),Ro=(0,k.useMemo)(()=>L===void 0?[]:Ca(u?.files.filter(d=>d.kind==="text")??[],L),[L,u?.files]),[gi,fi]=(0,k.useState)(0),[Tt,Mn]=(0,k.useState)(),Ko=(0,k.useMemo)(()=>Object.fromEntries(Ro.flatMap(d=>{let p=fe[d];return p===void 0||p.missing===!0?[]:[[d,p.content]]})),[fe,Ro]),Se=(0,k.useMemo)(()=>L===void 0?void 0:Pa(Ko,L),[L,Ko]),Et=(0,k.useMemo)(()=>(u?.files??[]).flatMap(d=>{if(d.kind!=="media"||d.mimeType?.startsWith("audio/")===!0)return[];if(!d.path.startsWith("\u5267\u96C6/")&&!d.path.startsWith("\u4EA4\u4ED8/"))return[];let p=d.path.toLocaleUpperCase().match(/(?:SHOT|IMG|MOTION|VISUAL)-[A-Z0-9-]+/u)?.[0]??d.path.split("/").at(-2)??"PROJECT-MEDIA";return[{id:`workspace:${d.path}:${d.version}`,targetId:p,kind:d.mimeType?.startsWith("image/")===!0?"image":"video",url:he("media",e,d.path),path:d.path}]}),[e,u?.files]),yi=(0,k.useMemo)(()=>{if(Se===void 0)return[];let d=Se.episodeDirectory.split("/").at(-1)??"",p=[...Se.shots.map(x=>x.id),...Se.assets.map(x=>x.id),...Se.visualAssets.map(x=>x.id),...Se.motions.map(x=>x.id)].sort((x,D)=>D.length-x.length),y=new Map(Se.motions.flatMap(x=>x.shotId===void 0?[]:[[x.id,x.shotId]]));return Et.flatMap(x=>{if(x.path===void 0||!x.path.startsWith(`${Se.episodeDirectory}/`)&&!x.path.startsWith(`\u4EA4\u4ED8/${d}/`))return[];let D=Da(x.path,p),A=/(?:^|\/)成片-[^/]+\.mp4$/iu.test(x.path)||/(?:^|\/)制作成果\/成片\//u.test(x.path);if(D===void 0&&!A)return[];let ue=D===void 0?Se.episodeDirectory:y.get(D)??D;return[{...x,targetId:ue}]})},[Se,Et]),bi=L===void 0?void 0:si[L],vi=L===void 0?[]:di[L]??[],xi=L===void 0?{}:li[L]??{},wi=L===void 0?{}:ci[L]??{},ki=L===void 0?[]:ui[L]??[],Ci=L===void 0?{}:pi[L]??{},Pi=L===void 0?void 0:hi[L],Si=(0,k.useCallback)(d=>{L!==void 0&&$.setProductionSelectedIds(p=>({...p,[L]:d}))},[$,L]),Ii=(0,k.useCallback)(d=>{L!==void 0&&$.setProductionJobs(p=>({...p,[L]:d}))},[$,L]),Ni=(0,k.useCallback)(d=>{L!==void 0&&$.setProductionSelections(p=>({...p,[L]:d}))},[$,L]),Ti=(0,k.useCallback)(d=>{L!==void 0&&$.setProductionReferences(p=>({...p,[L]:d}))},[$,L]),Ei=(0,k.useCallback)(d=>{L!==void 0&&$.setProductionSequence(p=>({...p,[L]:d}))},[$,L]),Ri=(0,k.useCallback)(d=>{L!==void 0&&$.setProductionCanvas(p=>({...p,[L]:d}))},[$,L]),Di=(0,k.useCallback)(d=>{L!==void 0&&$.setProductionViewport(p=>({...p,[L]:d}))},[$,L]),ro=q(d=>d.editorMode),Ke=$.setEditorMode,Yo=(0,k.useRef)(S),Do=(0,k.useRef)(null),Rt=(0,k.useRef)(new Map),On=$e!==void 0&&$e.missing!==!0,Vn=b==="game"||b==="video"?void 0:b,An=(0,k.useRef)(void 0);(0,k.useEffect)(()=>{if(u===void 0||An.current===u.cwd)return;An.current=u.cwd;let d=pa(b,u.files.filter(p=>R.includes(Qe(p.path)??"story")),R.includes("game")?u.games:[],R.includes("video")?u.videos:[]);se(d)},[se,b,R,u]);let $i=Je!==void 0&&H.some(({path:d})=>d.startsWith(`${Je.root}/build/`)),Mi=ho!==void 0&&H.some(({path:d})=>d.startsWith(`${ho.root}/`));(0,k.useEffect)(()=>{Le.current=fe},[fe]);let io=(0,k.useCallback)(()=>{let d=Do.current;d===null||S===void 0||d.getAttribute("aria-label")!==S||Rt.current.set(S,{scrollTop:d.scrollTop,selectionStart:d.selectionStart,selectionEnd:d.selectionEnd})},[S]);(0,k.useLayoutEffect)(()=>{if(ro!=="source"||S===void 0||!On)return;let d=Do.current,p=Rt.current.get(S);if(d===null||p===void 0)return;let y=Math.min(p.selectionEnd,d.value.length);d.setSelectionRange(Math.min(p.selectionStart,y),y),d.scrollTop=p.scrollTop},[ro,On,S]),(0,k.useEffect)(()=>{let d=p=>{Object.values(Le.current).some(y=>y.source==="human"&&y.content!==y.saved)&&p.preventDefault()};return globalThis.addEventListener("beforeunload",d),()=>{globalThis.removeEventListener("beforeunload",d)}},[]);let so=(0,k.useCallback)(d=>{let p=d.split("/"),y=[fn(d)];for(let x=1;x<p.length-1;x+=1)y.push(p.slice(0,x+1).join("/"));ce(x=>{let D={...x};for(let A of y)D[A]=!0;return D})},[]),lo=(0,k.useCallback)(d=>{let p=Qe(d)??"story";if(R.includes(p)){if(io(),se(p),p==="game"){let y=u?.games.find(x=>d.startsWith(`${x.root}/`));y!==void 0&&we(y.id),d.includes("/build/app/")||Ee("design")}if(p==="video"){Yo.current=d,Ke("preview");let y=u?.videos.find(x=>d.startsWith(`${x.root}/`));y!==void 0&&Xe(y.id),/\.(?:mp4|mov|webm|mkv)$/iu.test(d)||Be("docs")}le(d),so(d)}},[so,io,Ke,we,Xe,Be,R,u?.games,u?.videos]);(0,k.useEffect)(()=>{if(u===void 0)return;let d=m.filter(({callId:p})=>kn[p]!==!0);if(d.length!==0){for(let{intent:p}of d){if(p.action==="open_section"||p.action==="focus_target"){let y=["\u5206\u955C.md","\u56FE\u7247\u63D0\u793A\u8BCD.md","\u89C6\u89C9\u8BBE\u5B9A.md","\u5267\u672C.md","\u89C6\u9891\u63D0\u793A\u8BCD.md"].map(x=>`${p.episode}/${x}`).find(x=>u.files.some(D=>D.path===x));y!==void 0&&R.includes("drama")&&(se("drama"),$.setDramaEpisode(p.episode),$.setDramaPane("canvas"),le(y),so(y),globalThis.setTimeout(()=>{Ke("production")},0))}if(p.action==="open_section")mo(p.section);else if(p.action==="focus_target")$.setProductionSelectedIds(y=>({...y,[p.episode]:p.targetId})),mo(p.section??(p.targetId.startsWith("SHOT-")?"shots":"assets"));else if(p.action==="set_sequence")$.setProductionSequence(y=>({...y,[p.episode]:p.shotIds.map(x=>({shotId:x}))}));else{let{jobId:y,targetId:x,jobKind:D}=p;$.setProductionJobs(A=>{let ue=A[p.episode]??[];return ue.some(Fe=>Fe.id===y)?{...A,[p.episode]:ue.map(Fe=>Fe.id===y?{...Fe,targetId:x,kind:D,status:"running",progress:Math.max(10,Fe.progress),prompt:p.prompt??Fe.prompt,expectedOutputs:p.expectedOutputs??Fe.expectedOutputs,error:void 0}:Fe)}:{...A,[p.episode]:[...ue,{...xo({id:y,targetId:x,kind:D,prompt:p.prompt??"",expectedOutputs:p.expectedOutputs}),status:"running",progress:10}]}})}}$.setProductionIntentCalls(p=>({...p,...Object.fromEntries(d.map(({callId:y})=>[y,!0]))}))}},[$,so,kn,m,Ke,mo,le,se,R,u]);let Wn=(0,k.useRef)(!1);b==="game"&&(Wn.current=!0);let Oi=Wn.current,_n=(0,k.useRef)(!1);b==="video"&&(_n.current=!0);let Vi=_n.current,Qo=(0,k.useCallback)(d=>{so(d);let p=S===void 0?void 0:Le.current[S];d!==S&&p?.source==="human"&&p.content!==p.saved&&oo.current?.ownerDocument.activeElement===Do.current||b==="game"&&(xe!=="design"||p?.source==="human"&&p.content!==p.saved)||b==="video"&&(Ie!=="docs"||p?.source==="human"&&p.content!==p.saved)||lo(d)},[so,xe,lo,S,Ie,b]);(0,k.useEffect)(()=>{B!==void 0&&B===S&&!no&&Ke("source")},[B,S,no]),(0,k.useEffect)(()=>{Yo.current!==S&&(Yo.current=S,Ke(S!==void 0&&K.has(S)?"source":no||Uo?"preview":"source"))},[K,Uo,S,no]),(0,k.useEffect)(()=>{T||B===void 0&&(S!==void 0&&((u?.files.some(d=>d.path===S)??!1)||fe[S]!==void 0)&&Qe(S)===b||le(u===void 0?void 0:ot(u.files,b)))},[B,fe,S,b,u,T]),(0,k.useEffect)(()=>{if(u===void 0||T)return;let d=new Set(u.files.map(p=>p.path));ne(p=>{let y=!1,x={...p};for(let[D,A]of Object.entries(p))d.has(D)||K.has(D)||A.source==="agent"&&i&&D===j||(A.source==="human"&&A.content!==A.saved?A.missing!==!0&&(x[D]={...A,missing:!0,error:"\u6587\u4EF6\u5DF2\u4ECE workspace \u79FB\u9664\u3002\u672C\u5730\u8349\u7A3F\u4ECD\u4FDD\u7559\uFF0C\u53EF\u590D\u5236\u540E\u653E\u5F03\u8349\u7A3F\u3002"},y=!0):(delete x[D],y=!0));return y?x:p})},[K,i,j,u,T]),(0,k.useEffect)(()=>{if(S===void 0||no||K.has(S)||!(u?.files.some(p=>p.path===S)??!1))return;let d=new AbortController;return ne(p=>{let y=p[S];return y===void 0?p:{...p,[S]:{...y,error:void 0}}}),fetch(he("file",e,S),{signal:d.signal}).then(p=>No(p)).then(p=>{ne(y=>{let x=y[p.path];return x?.source==="human"&&x.content!==x.saved?x.version===p.version?{...y,[p.path]:{...x,missing:!1,error:void 0}}:{...y,[p.path]:{...x,missing:!1,error:void 0,conflict:{message:`${p.path} \u5DF2\u5728\u78C1\u76D8\u4E0A\u66F4\u65B0\uFF1B\u4F60\u7684\u672C\u5730\u8349\u7A3F\u6CA1\u6709\u88AB\u8986\u76D6\u3002`,theirs:p.content,theirsVersion:p.version}}}:{...y,[p.path]:{content:p.content,saved:p.content,source:"disk",version:p.version}}})}).catch(p=>{d.signal.aborted||ne(y=>{let x=y[S];return x===void 0?y:{...y,[S]:{...x,error:p instanceof Error?p.message:String(p)}}})}),()=>{d.abort()}},[K,S,no,e,u?.files]),(0,k.useEffect)(()=>{if(!go)return;let d=Ro.filter(y=>Le.current[y]===void 0&&!K.has(y));if(d.length===0)return;let p=new AbortController;return Mn(void 0),Promise.all(d.map(y=>fetch(he("file",e,y),{signal:p.signal}).then(x=>No(x)))).then(y=>{ne(x=>{let D={...x};for(let A of y){let ue=D[A.path];ue?.source==="human"&&ue.content!==ue.saved||(D[A.path]={content:A.content,saved:A.content,source:"disk",version:A.version})}return D})}).catch(y=>{p.signal.aborted||(Mn({episode:L??"",message:y instanceof Error?y.message:String(y)}),ne(x=>{let D={...x};for(let A of d){let ue=D[A];ue!==void 0&&(D[A]={...ue,error:y instanceof Error?y.message:String(y)})}return D}))}),()=>{p.abort()}},[K,L,Ro,gi,go,e]),(0,k.useEffect)(()=>{if(H.length!==0){for(let{path:d}of H)so(d);B!==void 0&&Qo(B),ne(d=>{let p=d;for(let{activity:y,path:x}of H){let D=p[x];if(D?.source==="human"&&D.content!==D.saved){p={...p,[x]:{...D,conflict:{message:`${x} \u6B63\u7531 Agent \u4FEE\u6539\uFF1B\u4F60\u7684\u672C\u5730\u8349\u7A3F\u5DF2\u9501\u5B9A\uFF0C\u4E0D\u4F1A\u88AB\u8986\u76D6\u3002`}}};continue}let A=Bo.current.get(y.callId);(A===void 0||A.path!==x)&&(A={path:x,base:D?.content??""},Bo.current.set(y.callId,A));let ue=ha(y,A.base);ue===void 0||D?.source==="agent"&&D.content===ue||(p={...p,[x]:{content:ue,saved:D?.saved??"",source:"agent",version:D?.version??""}})}return p})}},[B,so,Qo,H]),(0,k.useEffect)(()=>{let d=new Set(ia(o));for(let{activity:y}of H)d.add(y.callId.split(":",1)[0]??y.callId);let p=[...Sn.current].some(y=>!d.has(y));for(let y of Bo.current.keys())d.has(y.split(":",1)[0]??y)||Bo.current.delete(y);Sn.current=d,p&&O()},[H,O,o]),(0,k.useEffect)(()=>{if(a===void 0||a===In)return;if(r===void 0||!Nn.current.has(r)){$.setSettledMutation(a);return}if(u?.cwd===void 0)return;$.setSettledMutation(a);let d=Vo(a.slice(a.indexOf("\0")+1),u.cwd);d!==void 0&&Qo(d),O()},[$,In,Qo,O,a,r,u?.cwd]),(0,k.useEffect)(()=>{if(S!==void 0){for(let d of Pn.current?.querySelectorAll("button[data-file-path]")??[])if(d.dataset.filePath===S){d.scrollIntoView({block:"nearest"});break}}},[S]),(0,k.useEffect)(()=>{if(!Q||H.length>0||u===void 0)return;let d=oo.current?.parentElement;if(d==null)return;let p=new Set(u.files.map(x=>x.path)),y=x=>{let D=x.target;if(!(D instanceof Element))return;let A=D.closest("button, a");if(A===null||A.closest(".oh-story-split-surface")!==null)return;let ue=[A.title,A.getAttribute("aria-label"),A.textContent];for(let Fe of ue){let Mo=Vo(Fe?.trim().replace(/^(?:Open|打开)\s+/u,""),u.cwd);if(!(Mo===void 0||!p.has(Mo))){x.preventDefault(),x.stopPropagation(),lo(Mo),Qe(Mo)==="drama"&&($.setDramaPane("documents"),$.setDramaFilesOpen(!0),$.setDramaEpisode(vo(Mo)));break}}};return d.addEventListener("click",y,!0),()=>{d.removeEventListener("click",y,!0)}},[$,H.length,Q,lo,u]),(0,k.useEffect)(()=>{if(b!=="game"&&b!=="video")return;let d=oo.current,p=d?.parentElement,y=Array.from(p?.children??[]).find(D=>D!==d&&D instanceof HTMLElement);if(!(y instanceof HTMLElement))return;let x={id:y.id,role:y.getAttribute("role"),labelledBy:y.getAttribute("aria-labelledby")};return y.id=Ct,y.setAttribute("role","tabpanel"),y.setAttribute("aria-labelledby",`${Ge}-chat-tab`),()=>{y.id=x.id,x.role===null?y.removeAttribute("role"):y.setAttribute("role",x.role),x.labelledBy===null?y.removeAttribute("aria-labelledby"):y.setAttribute("aria-labelledby",x.labelledBy)}},[Ct,Ge,b]);let Zo=(0,k.useCallback)(async d=>{if(Pt.current.has(d))return;let p=Le.current[d];if(!(p===void 0||p.missing===!0||p.content===p.saved)){Pt.current.add(d),ne(y=>{let x=y[d];return x===void 0?y:{...y,[d]:{...x,saving:!0,error:void 0}}});try{let y=await No(await fetch(he("file",e,d),{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify({content:p.content,baseVersion:p.version})}));ne(x=>{let D=x[d];if(D===void 0)return x;let A=D.content===p.content;return{...x,[d]:{content:A?y.content:D.content,saved:y.content,source:A?"disk":"human",version:y.version,saving:!1}}}),O()}catch(y){if(y instanceof bt&&y.status===412)try{let x=await No(await fetch(he("file",e,d)));ne(D=>{let A=D[d];return A===void 0?D:{...D,[d]:{...A,saving:!1,conflict:{message:`${d} \u5DF2\u5728\u78C1\u76D8\u4E0A\u66F4\u65B0\uFF1B\u8BF7\u9009\u62E9\u4FDD\u7559\u54EA\u4E00\u7248\u3002`,theirs:x.content,theirsVersion:x.version}}}})}catch(x){ne(D=>{let A=D[d];return A===void 0?D:{...D,[d]:{...A,saving:!1,error:x instanceof Error?x.message:String(x)}}})}else ne(x=>{let D=x[d];return D===void 0?x:{...x,[d]:{...D,saving:!1,error:y instanceof Error?y.message:String(y)}}})}finally{Pt.current.delete(d)}}},[O,e]);(0,k.useEffect)(()=>{if(!Q)return;let d=p=>{p.defaultPrevented||!(p.metaKey||p.ctrlKey)||p.key.toLocaleLowerCase()!=="s"||b==="video"&&Ie!=="docs"||b==="game"&&(xe!=="design"||Je?.id===void 0)||b==="video"&&(!(p.target instanceof Element)||p.target.closest(".oh-video-documents")===null)||b==="game"&&(!(p.target instanceof Element)||p.target.closest(".oh-game-documents")===null)||(p.preventDefault(),S!==void 0&&Zo(S))};return globalThis.addEventListener("keydown",d),()=>{globalThis.removeEventListener("keydown",d)}},[Je?.id,xe,Q,Zo,S,Ie,b]);let Ai=(0,k.useMemo)(()=>{let d=new Map,p=[...u?.files??[]].filter(x=>Qe(x.path)===b);B!==void 0&&!p.some(x=>x.path===B)&&p.push({path:B,bytes:0,version:"",kind:"text"}),p.sort((x,D)=>x.path.localeCompare(D.path,"zh-Hans-CN"));for(let x of p){let D=fn(x.path),A=d.get(D)??[];A.push(x),d.set(D,A)}let y=Td[b];return[...d.entries()].sort(([x],[D])=>{let A=y.indexOf(x),ue=y.indexOf(D);return(A<0?y.length:A)-(ue<0?y.length:ue)||x.localeCompare(D,"zh-Hans-CN")})},[B,b,u]),$o=d=>{if(!R.includes(d))return;let p=oo.current?.ownerDocument.activeElement;if(xt.current=p?.closest('[role="tablist"][aria-label="\u521B\u4F5C\u5DE5\u4F5C\u53F0"]')!==null&&p?.closest('[role="tablist"][aria-label="\u521B\u4F5C\u5DE5\u4F5C\u53F0"]')!==void 0,se(d),d==="game"||d==="video"){d==="game"?Ee("preview"):Be("preview"),le(void 0);return}let y=u===void 0?void 0:ot(u.files,d);y===void 0?le(void 0):lo(y)},Wi=d=>{yn.set(u?.cwd,d);let p=tn(b,d);p!==b&&$o(p)},_i=()=>{oe(!1),globalThis.requestAnimationFrame(()=>{let d=oo.current?.querySelectorAll(".oh-workbench-settings-toggle");Array.from(d??[]).find(p=>p.getClientRects().length>0)?.focus()})},zn=d=>{d==="preview"&&io(),b==="drama"&&$.setDramaPane(d==="production"?"canvas":"documents"),Ke(d)},jn=d=>{d==="canvas"?(io(),$.setDramaPane("canvas"),mo("canvas")):($.setDramaPane("documents"),$.setDramaFilesOpen(!0))},zi=d=>{$.setDramaPane("documents"),$.setDramaFilesOpen(!0);let y=(Le.current[d.path]?.content??"").slice(0,d.offset),x=Math.max(0,y.split(/\r?\n/u).length*28-96);Rt.current.set(d.path,{scrollTop:x,selectionStart:d.offset,selectionEnd:d.offset}),Yo.current=d.path,lo(d.path),Ke("source")},Ln=d=>{Qe(d)==="drama"&&($.setDramaPane("documents"),$.setDramaEpisode(vo(d)??L)),lo(d)},Dt=d=>{globalThis.setTimeout(()=>{let p=f(d);d!==void 0&&(uo(p?void 0:d),vt(void 0))},0)},Gn=d=>{$.setDramaChatOpen(!0);let p;if(d!==void 0&&Se!==void 0){let x=Me(Se,d,Ko);p=x!==d||Se.targets.has(d)?x:void 0}let y=p===void 0?L===void 0?"\u6211\u60F3\u5148\u8BA8\u8BBA\u8FD9\u90E8\u77ED\u5267\u7684\u7B2C\u4E00\u96C6\uFF0C\u4ECE\u6545\u4E8B\u548C\u89D2\u8272\u5F00\u59CB\u3002":void 0:`\u6211\u60F3\u7EE7\u7EED\u8C03\u6574 ${L?.split("/").at(-1)??"\u672C\u96C6"} \u7684\u300C${p}\u300D\u3002\u8BF7\u5148\u548C\u6211\u8BA8\u8BBA\u601D\u8DEF\uFF0C\u4E0D\u751F\u6210\u4EFB\u4F55\u7D20\u6750\u3002`;Dt(y)},ji=d=>{$.setGameChatOpen(!0),Ve("chat"),Dt(d)},Li=d=>{$.setVideoChatOpen(!0),Ne("chat"),Dt(d)},Gi=d=>{$.setVideoChatOpen(d),d||Ne("studio")},Fi=d=>{$.setGameChatOpen(d),d||Ve("studio")},$t=d=>{if(S===void 0||ao?.theirs===void 0||ao.theirsVersion===void 0)return;let p=ao.theirs,y=ao.theirsVersion;ne(x=>{let D=x[S];return D===void 0?x:{...x,[S]:d?{...D,saved:p,version:y,source:"human",conflict:void 0}:{content:p,saved:p,source:"disk",version:y}}})},Fn={selected:S,buffers:fe,mode:ro,textareaRef:Do,errors:ni,onSelect:lo,onMode:Ke,onSave:Zo,onConflict:$t,onEdit:(d,p)=>{ne(y=>{let x=y[d];return x===void 0?y:{...y,[d]:{...x,content:p,source:"human"}}})},onDiscard:d=>{ne(p=>{let y={...p};return delete y[d],y}),le(void 0)},onRememberPosition:io,onRetry:()=>{ti(d=>d+1),O()}},Hi=async d=>{$.setDramaChatOpen(!0),await c(d)},qi=Ro.some(d=>fe[d]===void 0&&!K.has(d)),Hn=Se===void 0?void 0:qi?Tt!==void 0&&Tt.episode===L?(0,l.jsxs)("div",{className:"oh-story-empty",role:"alert",children:["\u6682\u65F6\u65E0\u6CD5\u8BFB\u53D6\u672C\u96C6\u6587\u7A3F\uFF1A",Tt.message,(0,l.jsx)("button",{type:"button",onClick:()=>{fi(d=>d+1)},children:"\u91CD\u65B0\u8BFB\u53D6"})]}):(0,l.jsx)("div",{className:"oh-story-empty",role:"status",children:"\u6B63\u5728\u6574\u7406\u672C\u96C6\u753B\u5E03\u2026"}):(0,l.jsx)(ir,{sessionId:e,production:Se,documents:Ko,sessionRunning:i,queue:g,section:ii,selectedId:bi,jobs:vi,versions:yi,libraryVersions:Et,selections:xi,manualReferences:wi,sequence:ki,canvas:Ci,viewport:Pi,onSectionChange:mo,onSelect:Si,onNavigate:zi,onJobsChange:Ii,onSelectionsChange:Ni,onManualReferencesChange:Ti,onOpenMedia:Ln,onSequenceChange:Ei,onCanvasChange:Ri,onViewportChange:Di,onContinueInChat:Gn,onDispatchPrompt:Hi,onCancelTurn:I,onRemoveQueued:w,onRefresh:O}),qn=S??`\u5728\u5F53\u524D DSH workspace \u4E2D\u9009\u62E9${fo(b)}\u6587\u4EF6`,Bi=S?.split("/").at(-1)??qn,Ui=S===void 0?void 0:fn(S),Bn=(d,p)=>{ce(y=>({...y,[d]:p}))};return Q?(0,l.jsxs)("div",{ref:oo,className:"oh-story-split-surface","data-open":"true","data-workbench":b,"data-drama-pane":De,"data-drama-files":v?"open":"closed","data-drama-chat":M?"open":"closed",children:[(0,l.jsx)("style",{children:yt}),re&&(0,l.jsx)(kr,{modes:R,onChange:Wi,onClose:_i}),Ae!==void 0&&(0,l.jsxs)("aside",{className:"oh-story-context-fallback","aria-live":"polite","aria-label":"\u5E26\u5230 Chat \u7684\u8BA8\u8BBA\u5185\u5BB9",children:[(0,l.jsxs)("header",{children:[(0,l.jsx)("strong",{children:"\u8BA8\u8BBA\u5185\u5BB9\u5DF2\u4FDD\u7559"}),(0,l.jsx)("button",{type:"button","aria-label":"\u5173\u95ED\u8BA8\u8BBA\u5185\u5BB9",onClick:()=>{uo(void 0)},children:"\xD7"})]}),(0,l.jsx)("p",{children:"\u8BA8\u8BBA\u5185\u5BB9\u672A\u81EA\u52A8\u586B\u5165 Chat\uFF0C\u5DF2\u6709\u8F93\u5165\u4FDD\u6301\u539F\u6837\u3002\u4F60\u53EF\u4EE5\u5728\u8FD9\u91CC\u67E5\u770B\u6216\u590D\u5236\u9009\u4E2D\u5185\u5BB9\u3002"}),(0,l.jsx)("button",{type:"button",onClick:()=>{navigator.clipboard.writeText(Ae).then(()=>{vt("\u5DF2\u590D\u5236\uFF0C\u53EF\u8D34\u5165 Chat \u7EE7\u7EED\u8BA8\u8BBA\u3002")}).catch(()=>{vt("\u590D\u5236\u6682\u4E0D\u53EF\u7528\uFF0C\u53EF\u5C55\u5F00\u9009\u4E2D\u5185\u5BB9\u624B\u52A8\u590D\u5236\u3002")})},children:"\u590D\u5236\u8BA8\u8BBA\u5185\u5BB9"}),eo!==void 0&&(0,l.jsx)("p",{role:"status",children:eo}),(0,l.jsxs)("details",{children:[(0,l.jsx)("summary",{children:"\u67E5\u770B\u9009\u4E2D\u5185\u5BB9"}),(0,l.jsx)("pre",{children:Ae})]})]}),(b==="game"||b==="video")&&(0,l.jsx)("div",{className:"oh-game-mobile-switcher",role:"tablist","aria-label":b==="game"?"\u7A84\u5C4F\u6E38\u620F\u5DE5\u4F5C\u53F0":"\u7A84\u5C4F\u89C6\u9891\u5DE5\u4F5C\u53F0",children:["studio","chat"].map(d=>(0,l.jsx)("button",{type:"button",role:"tab",id:`${Ge}-${d}-tab`,"aria-controls":d==="chat"?Ct:b==="game"?wt:kt,"aria-selected":(b==="game"?Re:P)===d,tabIndex:(b==="game"?Re:P)===d?0:-1,onKeyDown:p=>{We(p,["studio","chat"],b==="game"?Re:P,y=>{b==="game"?(Ve(y),y==="chat"&&$.setGameChatOpen(!0)):(Ne(y),y==="chat"&&$.setVideoChatOpen(!0))})},onClick:()=>{b==="game"?(Ve(d),d==="chat"&&$.setGameChatOpen(!0)):(Ne(d),d==="chat"&&$.setVideoChatOpen(!0))},children:d==="studio"?"\u5236\u4F5C":"\u5BF9\u8BDD"},d))}),b==="game"&&u===void 0&&(0,l.jsx)("main",{id:wt,className:"oh-game-studio",role:"tabpanel","aria-labelledby":`${Ge}-studio-tab`,children:(0,l.jsx)("div",{className:"oh-game-design-empty",children:C??"\u6B63\u5728\u8FDE\u63A5\u6E38\u620F\u5DE5\u4F5C\u53F0\u2026"})}),u!==void 0&&Oi&&(0,l.jsx)(Md,{workspace:u,building:$i,gameTab:xe,gameProjectId:Ce,hidden:b!=="game",onGameTab:Ee,onGameProject:we,paneId:wt,labelledBy:`${Ge}-studio-tab`,onWorkbench:$o,workbenchModes:R,onWorkbenchSettings:()=>{oe(!0)},onCollapse:()=>{Eo("closed")},editor:Fn,canvasByProject:ae,onCanvasChange:(d,p)=>{$.setGameCanvas(y=>({...y,[d]:p}))},chatOpen:Oe,onChatOpen:Fi,onContinueInChat:ji}),b==="video"&&u===void 0&&(0,l.jsx)("main",{id:kt,className:"oh-video-studio",role:"tabpanel","aria-labelledby":`${Ge}-studio-tab`,children:(0,l.jsx)("div",{className:"oh-video-preview-empty",children:C??"\u6B63\u5728\u8FDE\u63A5\u89C6\u9891\u5DE5\u4F5C\u53F0\u2026"})}),u!==void 0&&Vi&&(0,l.jsx)(Pr,{sessionId:e,projects:u.videos,files:u.files,editor:Fn,chatOpen:je,onChatOpen:Gi,onContinueInChat:Li,canvasByProject:Ue,onCanvasChange:(d,p)=>{$.setVideoCanvas(y=>({...y,[d]:p}))},running:Mi,projectId:co,tab:Ie,hidden:b!=="video",paneId:kt,labelledBy:`${Ge}-studio-tab`,onProject:Xe,onTab:Be,onWorkbench:$o,workbenchModes:R,onWorkbenchSettings:()=>{oe(!0)},onCollapse:()=>{Eo("closed")}}),b!=="game"&&b!=="video"&&(0,l.jsxs)(l.Fragment,{children:[b==="drama"&&(0,l.jsxs)("header",{className:"oh-drama-workspace-toolbar",children:[(0,l.jsxs)("div",{className:"oh-drama-workspace-brand",children:[(0,l.jsx)(ko,{className:"oh-story-mode-tabs",current:b,modes:R,onSelect:$o}),(0,l.jsx)(Po,{onClick:()=>{oe(!0)}})]}),(0,l.jsxs)("label",{className:"oh-drama-episode-picker",children:[(0,l.jsx)("span",{children:"\u5267\u96C6"}),(0,l.jsx)("select",{"aria-label":"\u9009\u62E9\u77ED\u5267\u5267\u96C6",value:L??"",onChange:d=>{$.setDramaEpisode(d.target.value),$.setDramaPane("canvas"),mo("canvas")},children:Jo.length===0?(0,l.jsx)("option",{value:"",children:"\u8FD8\u6CA1\u6709\u5267\u96C6"}):Jo.map(d=>(0,l.jsx)("option",{value:d,children:d.split("/").at(-1)},d))})]}),(0,l.jsx)("div",{className:"oh-drama-workspace-views",role:"tablist","aria-label":"\u77ED\u5267\u5DE5\u4F5C\u533A",children:["canvas","documents"].map(d=>(0,l.jsx)("button",{type:"button",role:"tab","aria-selected":De===d,tabIndex:De===d?0:-1,onKeyDown:p=>{We(p,["canvas","documents"],De,jn)},onClick:()=>{jn(d)},children:d==="canvas"?"\u5236\u4F5C":"\u6587\u7A3F"},d))}),(0,l.jsxs)("div",{className:"oh-drama-workspace-actions",children:[(0,l.jsx)("button",{type:"button","aria-label":v?"\u6536\u8D77\u9879\u76EE\u6587\u7A3F":"\u5C55\u5F00\u9879\u76EE\u6587\u7A3F","aria-expanded":v,onClick:()=>{$.setDramaFilesOpen(!v)},children:"\u6587\u7A3F\u76EE\u5F55"}),(0,l.jsx)("button",{type:"button","aria-label":M?"\u6536\u8D77\u539F\u751F Chat":"\u5C55\u5F00\u539F\u751F Chat","aria-expanded":M,onClick:()=>{$.setDramaChatOpen(!M)},children:"Chat"}),(0,l.jsx)("button",{type:"button","aria-label":"\u5237\u65B0\u9879\u76EE\u6587\u4EF6",onClick:O,children:"\u21BB"}),(0,l.jsx)("button",{type:"button","aria-label":"\u6536\u8D77\u521B\u4F5C\u5DE5\u4F5C\u53F0",onClick:()=>{Eo("closed")},children:"\xD7"})]})]}),(0,l.jsxs)("aside",{className:"oh-story-tree","aria-hidden":b==="drama"&&!v||void 0,children:[(0,l.jsxs)("div",{className:"oh-story-brand",hidden:b==="drama",children:[(0,l.jsxs)("span",{className:"oh-story-brand-cluster",children:[(0,l.jsxs)("strong",{children:["\u2726 ",(0,l.jsx)("span",{children:"Oh Story"})]}),Vn!==void 0&&(0,l.jsx)("span",{className:"oh-story-kind",children:Vn==="story"?"\u5C0F\u8BF4":"\u77ED\u5267"})]}),(0,l.jsxs)("span",{className:"oh-story-brand-actions",children:[(0,l.jsx)("button",{type:"button",onClick:O,title:"\u5237\u65B0","aria-label":"\u5237\u65B0\u9879\u76EE\u6587\u4EF6",children:"\u21BB"}),(0,l.jsx)("button",{type:"button",onClick:()=>{Eo("closed")},title:"\u6536\u8D77\u521B\u4F5C\u5DE5\u4F5C\u53F0","aria-label":"\u6536\u8D77\u521B\u4F5C\u5DE5\u4F5C\u53F0",children:"\xD7"})]})]}),u!==void 0&&b!=="drama"&&(0,l.jsxs)("div",{className:"oh-story-workbench-nav",children:[(0,l.jsx)(ko,{className:"oh-story-mode-tabs",current:b,modes:R,onSelect:$o}),(0,l.jsx)(Po,{onClick:()=>{oe(!0)}})]}),C!==void 0&&(0,l.jsx)("div",{className:"oh-story-error",children:C}),u?.metadataErrors.map(d=>(0,l.jsx)("div",{className:"oh-story-warning",children:d},d)),(0,l.jsx)("nav",{ref:Pn,"aria-label":b==="story"?"\u5C0F\u8BF4\u9879\u76EE\u6587\u4EF6":"\u77ED\u5267\u9879\u76EE\u6587\u4EF6",children:Ai.map(([d,p])=>{let y=Ui===d||To[d]===!0;return(0,l.jsxs)("details",{className:"oh-story-file-group",open:y,onToggle:x=>{Bn(d,x.currentTarget.open)},children:[(0,l.jsxs)("summary",{children:[d,(0,l.jsx)("span",{children:p.length})]}),(0,l.jsx)(Qr,{nodes:ya(p,d),depth:1,expanded:To,selected:S,activityPath:B,onToggle:Bn,onSelect:Ln})]},d)})})]}),(0,l.jsxs)("main",{className:"oh-story-editor","data-drama-canvas":te||void 0,children:[(0,l.jsxs)("header",{hidden:te,children:[(0,l.jsxs)("span",{className:"oh-story-editor-path",title:S,children:[(0,l.jsx)("span",{children:qn}),(0,l.jsx)("strong",{children:Bi})]}),(0,l.jsxs)("div",{className:"oh-story-editor-actions",children:[(Uo||go)&&!no&&(0,l.jsx)("div",{className:"oh-story-editor-tabs",role:"tablist","aria-label":go?"\u77ED\u5267\u6587\u6863\u67E5\u770B\u65B9\u5F0F":Nt?"Markdown \u67E5\u770B\u65B9\u5F0F":"JSONL \u67E5\u770B\u65B9\u5F0F",children:$n.map(d=>(0,l.jsx)("button",{type:"button",role:"tab",tabIndex:ro===d?0:-1,"aria-selected":ro===d,onKeyDown:p=>{We(p,$n,ro,zn)},onClick:()=>{zn(d)},children:d==="preview"?"\u9884\u89C8":d==="source"?"\u6E90\u7801":"\u751F\u4EA7"},d))}),(mi||St)&&S!==void 0&&(0,l.jsx)("button",{className:"oh-story-save",type:"button",disabled:St||$e?.missing===!0,onClick:()=>{Zo(S)},children:St?"\u4FDD\u5B58\u4E2D\u2026":"\u4FDD\u5B58"})]})]}),z!==void 0&&B!==void 0&&B===S&&(0,l.jsxs)("div",{className:"oh-story-stream","data-stage":z.stage,role:"status","aria-live":"polite",children:["\u25CF ",z.stage==="running"?"Agent \u6B63\u5728\u5E94\u7528\u4FEE\u6539":"Agent \u6B63\u5728\u751F\u6210\u6587\u4EF6\u5185\u5BB9"]}),ao!==void 0&&(0,l.jsxs)("div",{className:"oh-story-conflict",role:"alert",children:[(0,l.jsx)("span",{children:ao.message}),ao.theirs!==void 0&&ao.theirsVersion!==void 0&&S!==void 0&&(0,l.jsxs)("div",{children:[(0,l.jsx)("button",{type:"button",onClick:()=>{$t(!1)},children:"\u8F7D\u5165\u78C1\u76D8\u7248\u672C"}),(0,l.jsx)("button",{type:"button",onClick:()=>{$t(!0)},children:"\u4FDD\u7559\u672C\u5730\u8349\u7A3F"})]})]}),Tn!==void 0&&(0,l.jsx)("div",{className:"oh-story-error",children:Tn}),te?Hn??(0,l.jsxs)("div",{className:"oh-drama-empty-workspace",children:[(0,l.jsx)("strong",{children:"\u4ECE\u7B2C\u4E00\u96C6\u5F00\u59CB\uFF0C\u8BA9\u6545\u4E8B\u6162\u6162\u751F\u957F"}),(0,l.jsx)("p",{children:"\u8BF4\u8BF4\u4F60\u60F3\u8BB2\u7684\u6545\u4E8B\uFF0C\u6216\u628A\u5DF2\u6709\u5267\u672C\u4EA4\u7ED9 AI\u3002\u4EBA\u7269\u3001\u573A\u666F\u548C\u955C\u5934\u4F1A\u5728\u8FD9\u91CC\u5C55\u5F00\u3002"}),(0,l.jsx)("button",{type:"button",onClick:()=>{Gn()},children:"\u548C AI \u8BA8\u8BBA\u7B2C\u4E00\u96C6"})]}):S===void 0?(0,l.jsx)("div",{className:"oh-story-empty",children:b==="story"?(0,l.jsxs)(l.Fragment,{children:["\u5F53\u524D workspace \u8FD8\u6CA1\u6709\u5C0F\u8BF4\u6587\u4EF6\u3002\u53EF\u5728\u53F3\u4FA7 Chat \u4E2D\u8FD0\u884C ",(0,l.jsx)("code",{children:"/story-setup"}),"\u3002"]}):(0,l.jsxs)(l.Fragment,{children:["\u5F53\u524D workspace \u8FD8\u6CA1\u6709\u77ED\u5267\u9879\u76EE\u3002\u53EF\u5728\u53F3\u4FA7 Chat \u4E2D\u8FD0\u884C ",(0,l.jsx)("code",{children:"/short-drama"}),"\u3002"]})}):no&&to!==void 0?(0,l.jsx)("div",{className:"oh-story-media-document",children:to.mimeType?.startsWith("image/")===!0?(0,l.jsx)("img",{src:he("media",e,to.path),alt:to.path}):to.mimeType?.startsWith("audio/")===!0?(0,l.jsx)("audio",{src:he("media",e,to.path),controls:!0}):(0,l.jsx)("video",{src:he("media",e,to.path),controls:!0,preload:"metadata"})}):$e===void 0?(0,l.jsxs)("div",{className:"oh-story-empty",children:["\u6B63\u5728\u52A0\u8F7D ",S,"\u2026"]}):$e.missing===!0?(0,l.jsxs)("div",{className:"oh-story-empty",children:["\u6587\u4EF6\u5DF2\u4ECE workspace \u79FB\u9664\uFF0C\u672C\u5730\u8349\u7A3F\u4ECD\u4FDD\u7559\u3002\u8BF7\u5148\u590D\u5236\u9700\u8981\u7684\u5185\u5BB9\uFF0C\u518D\u653E\u5F03\u8349\u7A3F\u3002",(0,l.jsx)("button",{type:"button",onClick:()=>{ne(d=>{let p={...d};return delete p[S],p}),le(u===void 0?void 0:ot(u.files,b))},children:"\u653E\u5F03\u672C\u5730\u8349\u7A3F"})]}):ro==="production"&&go&&Se!==void 0?Hn:Uo&&ro==="preview"?Nt?(0,l.jsx)(bo,{content:$e.content,label:S}):(0,l.jsx)(va,{content:$e.content,label:S}):(0,l.jsx)("textarea",{ref:Do,value:$e.content,"data-format":Rn?"structured":"prose",onBlur:io,onScroll:io,onSelect:io,onChange:d=>{let p=d.target.value;ne(y=>({...y,[S]:{content:p,saved:y[S]?.saved??"",source:"human",version:y[S]?.version??"",conflict:y[S]?.conflict,saving:y[S]?.saving}}))},spellCheck:!Rn,"aria-label":S})]})]})]}):!X&&C===void 0?ge?(0,l.jsx)(ln,{styles:yt,dismissing:ee,onDismiss:ve}):null:(0,l.jsxs)("div",{ref:oo,className:"oh-story-split-surface","data-open":"false",children:[(0,l.jsx)("style",{children:yt}),(0,l.jsxs)("button",{className:"oh-story-launcher",type:"button",title:C??"\u6253\u5F00\u521B\u4F5C\u5DE5\u4F5C\u53F0","aria-label":"\u6253\u5F00\u521B\u4F5C\u5DE5\u4F5C\u53F0",onClick:()=>{Eo("open")},children:[(0,l.jsx)("span",{"aria-hidden":!0,children:"\u2726"}),(0,l.jsx)("b",{children:"\u521B\u4F5C\u5DE5\u4F5C\u53F0"})]})]})}function Vd(e){return(0,l.jsx)(Ad,{...e},e.sessionId)}function Ad(e){let{sessionId:o,useStore:t,actions:n}=e,a=t(r=>r.hydrated);return(0,k.useLayoutEffect)(()=>{a||n.restore(Yr.get(o))},[n,a,o]),a?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(Wd,{sessionId:o,useStore:t}),(0,l.jsx)(_d,{...e})]}):null}function Wd({sessionId:e,useStore:o}){let t=o(n=>n);return(0,k.useEffect)(()=>{Yr.set(e,t)},[t,e]),null}function _d({sessionId:e,useSession:o,useSessions:t,useProjection:n,useChat:a,useStore:r,actions:s,sendProductionPrompt:i,focusProductionChat:g,cancelProduction:m,removeQueuedProduction:c}){let f=(0,k.useRef)(null),[I,w]=(0,k.useState)(),u=a(P=>P.legacy.runningCalls),b=a(P=>ta(P.timeline)),R=a(P=>na(P),aa),C=a(P=>la(P)),T=a(P=>ca(P)),O=a(P=>ua(P)),Q=r(P=>P.workbench),X=r(P=>P.gamePane),ge=r(P=>P.gameChatOpen),ee=r(P=>P.videoChatOpen),ve=r(P=>P.videoPane),q=r(P=>P.dramaChatOpen),$=r(P=>P.dramaFilesOpen),W=o(P=>P.running),H=n("inbox",P=>P?.["next-turn"]),Pe=o(P=>P.pendingSubmissions),K=(0,k.useMemo)(()=>Ra(H,new Set(Pe.filter(P=>P.placement==="transcript").map(P=>P.requestId))),[H,Pe]),N=a(P=>P),j=(0,k.useMemo)(()=>ur(N),[N]),{workspace:z,error:B,loading:re,reload:oe}=Rd(e,W),se=(0,k.useCallback)(P=>yn.subscribe(z?.cwd,P),[z?.cwd]),xe=(0,k.useCallback)(()=>yn.get(z?.cwd),[z?.cwd]),Oe=(0,k.useSyncExternalStore)(se,xe),ae=tn(Q,Oe);(0,k.useLayoutEffect)(()=>{Q!==ae&&s.setWorkbench(ae)},[s,Q,ae]);let Ee=r(P=>P.workbenchPreference),Ce=z?.openEmptyWorkbench===!0||Sr(z),we=vn,Re=(0,k.useSyncExternalStore)(we.subscribe,we.getSnapshot,we.getSnapshot),Ve=t(P=>P.byId[e]?.blank===!0);(0,k.useEffect)(()=>{Ve&&z!==void 0&&!Ce&&z.welcomeGuide===void 0&&we.ensureFallbackHostConfig()},[Ce,Ve,we,z]);let Ie=Ho({formStatus:Re.formStatus,hostValue:Re.hostValue,writable:Re.writable,optimisticValue:Re.optimisticValue,localPreference:Re.localPreference,workspaceWelcomeGuide:z?.welcomeGuide??Re.fallbackHostValue}),Be=Ve&&z!==void 0&&!re&&!Ce&&Ie,co=(0,k.useMemo)(()=>dn(So(),z?.cwd),[z?.cwd]),je=Ir(Ee??co,Ce);return(0,k.useLayoutEffect)(()=>{let P=f.current?.ownerDocument;if(P===void 0)return;let Ne=()=>{let De=P.querySelector(`[data-conversation-content][data-conversation-session="${CSS.escape(e)}"]:not([data-sidebar-chat] *) [data-conversation-scroll] > [data-slot='conversation.session']`);w(v=>v===De?v:De??void 0)};Ne();let Ue=new MutationObserver(Ne);return Ue.observe(P.body,{childList:!0,subtree:!0}),()=>{Ue.disconnect()}},[e]),(0,k.useLayoutEffect)(()=>{let P=I?.parentElement;if(P==null)return;if(!je){let ce=()=>{let eo=P.getBoundingClientRect();P.style.setProperty("--oh-story-seam-top",`${String(eo.top)}px`),P.style.setProperty("--oh-story-seam-right",`${String(P.ownerDocument.documentElement.clientWidth-eo.right)}px`)};ce();let Ae=new ResizeObserver(ce);Ae.observe(P);let uo=P.ownerDocument.defaultView;return uo?.addEventListener("resize",ce),()=>{Ae.disconnect(),uo?.removeEventListener("resize",ce),P.style.removeProperty("--oh-story-seam-top"),P.style.removeProperty("--oh-story-seam-right")}}let Ne=()=>P.querySelector(":scope > [data-composer-seat]"),Ue=()=>P.scrollHeight-P.scrollTop-P.clientHeight<=8,De=Ue(),v=0,M=ce=>{ce.target instanceof Node&&Ne()?.contains(ce.target)===!0||ce.type==="pointerdown"&&ce.target!==P||(v=performance.now())},F=()=>{Ue()?De=!0:performance.now()-v<400&&(De=!1)},te=()=>{P.style.setProperty("--oh-story-scroll-height",`${String(P.clientHeight)}px`),P.style.setProperty("--oh-story-composer-height",`${String(Ne()?.getBoundingClientRect().height??0)}px`),P.dataset.ohStoryWorkbench=ae,P.dataset.ohGameChat=ge?"open":"closed",P.dataset.ohVideoChat=ee?"open":"closed",P.dataset.ohDramaChat=q?"open":"closed",P.dataset.ohDramaFiles=$?"open":"closed";let ce=ae==="video"?ve:X;P.dataset.ohStudioPane=ce;let Ae=ae==="game"||ae==="video"?720:620,uo=ae==="game"||ae==="video"?960:900,eo=P.clientWidth<Ae?"compact":P.clientWidth<uo?"medium":"wide";P.dataset.ohStoryLayout!==eo&&(P.dataset.ohStoryLayout=eo),De&&(P.scrollTop=P.scrollHeight-P.clientHeight)},S=new ResizeObserver(te),le=new WeakSet,fe=!1,ne=()=>{let ce=P.querySelector("[data-chat-flow]:not([data-step-process-content])");fe=ce!==null;for(let Ae of[Ne(),ce])Ae===null||le.has(Ae)||(le.add(Ae),S.observe(Ae))};te(),P.addEventListener("scroll",F,{passive:!0});for(let ce of["wheel","touchmove","pointerdown","keydown"])P.addEventListener(ce,M,{passive:!0});S.observe(P),ne();let Le=new MutationObserver(()=>{ne(),te()});Le.observe(P,{childList:!0});let To=new MutationObserver(()=>{fe||ne()});return To.observe(P,{childList:!0,subtree:!0}),()=>{To.disconnect(),P.removeEventListener("scroll",F);for(let ce of["wheel","touchmove","pointerdown","keydown"])P.removeEventListener(ce,M);S.disconnect(),Le.disconnect(),P.style.removeProperty("--oh-story-scroll-height"),P.style.removeProperty("--oh-story-composer-height"),delete P.dataset.ohStoryLayout,delete P.dataset.ohStoryWorkbench,delete P.dataset.ohStudioPane,delete P.dataset.ohGameChat,delete P.dataset.ohVideoChat,delete P.dataset.ohDramaChat,delete P.dataset.ohDramaFiles}},[q,$,ge,X,je,I,ee,ve,ae]),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("span",{ref:f,className:"oh-story-bridge-marker","aria-hidden":!0}),I===void 0?null:(0,bn.createPortal)((0,l.jsx)(Od,{sessionId:e,runningCalls:u,partial:b,undispatched:W?R:Id,settledMutation:C,settledMutationTurn:T,liveTurn:O,sessionRunning:W,productionQueue:K,productionIntents:j,workspace:z,workbench:ae,workbenchModes:Oe,error:B,workspaceLoading:re,reload:oe,open:je,workbenchAvailable:Ce,welcome:Be,welcomeSaving:Re.saving,onDismissWelcome:()=>{we.setEnabled(!1)},sendProductionPrompt:i,focusProductionChat:g,cancelProduction:m,removeQueuedProduction:c,useStore:r,actions:s}),I)]})}function zd(){let e=(0,k.useRef)(null),[o,t]=(0,k.useState)(),n=vn,a=(0,k.useSyncExternalStore)(n.subscribe,n.getSnapshot,n.getSnapshot);(0,k.useEffect)(()=>{n.ensureFallbackHostConfig()},[n]);let r=Ho({formStatus:a.formStatus,hostValue:a.hostValue,writable:a.writable,optimisticValue:a.optimisticValue,localPreference:a.localPreference,workspaceWelcomeGuide:a.fallbackHostValue});return(0,k.useLayoutEffect)(()=>{let s=e.current?.ownerDocument;if(s===void 0)return;let i=()=>{let m=s.querySelector("[data-conversation-content]:not([data-sidebar-chat] *) [data-conversation-scroll]");t(c=>c===m?c:m??void 0)};i();let g=new MutationObserver(i);return g.observe(s.body,{childList:!0,subtree:!0}),()=>{g.disconnect()}},[]),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("span",{ref:e,className:"oh-story-bridge-marker","aria-hidden":!0}),o===void 0||!r?null:(0,bn.createPortal)((0,l.jsx)(ln,{styles:yt,dismissing:a.saving,onDismiss:()=>{n.setEnabled(!1)}}),o)]})}function jd({SessionProvider:e,renderSlot:o}){return(0,l.jsx)(e,{empty:()=>(0,l.jsx)(zd,{}),children:o("oh-story.workspace",{})})}function Zr(e){let o=("kind"in e?e.call?.argsRaw:e.phase==="start"?e.argsRaw:void 0)??"{}";try{let t=JSON.parse(o);return typeof t=="object"&&t!==null&&!Array.isArray(t)?t:{}}catch{return{}}}function Xr(e){if("kind"in e)return e.content.map(o=>o.type==="text"?o.text:JSON.stringify(o,null,2)).join(`
`)}function Ld({block:e,inspect:o}){let t=Zr(e),n=typeof t.role=="string"?t.role:"story-role",a=Xr(e),r="kind"in e?e.isError?"error":"done":"running";return(0,l.jsxs)("details",{className:"oh-story-role","data-state":r,children:[(0,l.jsx)("style",{children:gn}),(0,l.jsxs)("summary",{children:[(0,l.jsx)("span",{children:"\u2726 Role"}),(0,l.jsx)("strong",{children:n}),(0,l.jsx)("em",{children:r==="running"?"\u8FD0\u884C\u4E2D":r==="error"?"\u5931\u8D25":"\u5B8C\u6210"})]}),a!==void 0&&(0,l.jsx)("pre",{children:a}),o!==void 0&&(0,l.jsx)("button",{type:"button",onClick:o,children:"\u5728\u8F68\u8FF9\u4E2D\u68C0\u67E5"})]})}function Gd({block:e,inspect:o}){let t=Zr(e),n=typeof t.action=="string"?t.action:"production",a=typeof t.episode=="string"?t.episode:"\u77ED\u5267",r=Xr(e),s="kind"in e?e.isError?"error":"done":"running";return(0,l.jsxs)("details",{className:"oh-story-role","data-state":s,children:[(0,l.jsx)("style",{children:gn}),(0,l.jsxs)("summary",{children:[(0,l.jsx)("span",{children:"\u25A6 \u751F\u4EA7"}),(0,l.jsxs)("strong",{children:[a," \xB7 ",n]}),(0,l.jsx)("em",{children:s==="running"?"\u6267\u884C\u4E2D":s==="error"?"\u5931\u8D25":"\u5DF2\u5E94\u7528"})]}),r!==void 0&&(0,l.jsx)("pre",{children:r}),o!==void 0&&(0,l.jsx)("button",{type:"button",onClick:o,children:"\u5728\u8F68\u8FF9\u4E2D\u68C0\u67E5"})]})}function ei(e){let o=new qo;vn=o,e.inject(["configForms"],t=>{let n=t.get("configForms");if(n===void 0)return;let a=n.get("oh-story");t.effect(()=>o.connectForm(a))}),e.slots.inject("plugins.bundle.config",()=>e.slots.register({name:"plugins.bundle.config",key:"@winterhuan/oh-story-dsh"},({view:t})=>(0,l.jsx)($r,{view:t,controller:o,styles:mn}))),e.slots.inject("shell.overlay",()=>{let t=e.slots.register({name:"shell.overlay",id:"oh-story-workspace",order:-100,children:{"oh-story.workspace":{kind:"single",scope:"session"}}},jd),n=e.slots.register({name:"oh-story.workspace",store:Nd,inject:a=>{let r=e.sessions.binding(a),s=r?.ctx.get("conversation");return r===void 0||s===void 0?{sendProductionPrompt:()=>Promise.reject(new Error("DSH \u4F1A\u8BDD\u5F53\u524D\u4E0D\u53EF\u7528\u3002")),focusProductionChat:()=>!1,cancelProduction:()=>Promise.reject(new Error("DSH \u4F1A\u8BDD\u5F53\u524D\u4E0D\u53EF\u7528\u3002")),removeQueuedProduction:()=>Promise.reject(new Error("DSH \u4F1A\u8BDD\u5F53\u524D\u4E0D\u53EF\u7528\u3002"))}:{sendProductionPrompt:i=>s.send(i),focusProductionChat:i=>qr(s.input,r,i),cancelProduction:()=>s.cancel(),removeQueuedProduction:i=>s.updateQueue(i,{kind:"remove"})}}},Vd);return[t,n]}),e.slots.inject("tool.call.toolview",()=>e.slots.register({name:"tool.call.toolview",key:"oh_story_role"},Ld)),e.slots.inject("tool.call.toolview",()=>e.slots.register({name:"tool.call.toolview",key:ut},Gd))}var Fd={name:Jr,inject:Kr,apply:ei};
;return module.exports;}});
//# sourceMappingURL=client.js.map
