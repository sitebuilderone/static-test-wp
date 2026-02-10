(()=>{var V=class{constructor(t={}){this.nodes=new Map,this.edges=new Map,this.conditionalEdges=new Map,this.entryPoint=null,this.initialState=t}addNode(t,o){return this.nodes.set(t,o),this}addEdge(t,o){return this.edges.set(t,o),this}addConditionalEdges(t,o,r){return this.conditionalEdges.set(t,{condition:o,mapping:r}),this}setEntryPoint(t){return this.entryPoint=t,this}compile(){return new fe(this)}},fe=class{constructor(t){this.graph=t}async*stream(t){let o={...t},r=this.graph.entryPoint||"__start__";if(r==="__start__"){let s=this.graph.edges.get("__start__");s&&(r=s)}let n=new Set,a=50,i=0;for(;r&&r!=="__end__"&&r!=="END"&&i<a;){i++;let s=this.graph.nodes.get(r);if(!s){console.warn(`Node not found: ${r}`);break}try{let d=await s(o);d&&(o=this.mergeState(o,d)),yield{[r]:d||{}}}catch(d){console.error(`Error in node ${r}:`,d),o.error=d.message,yield{[r]:{error:d.message}};break}let l=null;if(this.graph.conditionalEdges.has(r)){let{condition:d,mapping:c}=this.graph.conditionalEdges.get(r),p=d(o);l=c[p]||p}else l=this.graph.edges.get(r);r=l}}async invoke(t){let o={...t};for await(let r of this.stream(t)){let[n,a]=Object.entries(r)[0]||[];n&&a&&(o=this.mergeState(o,a))}return o}mergeState(t,o){let r={...t};for(let[n,a]of Object.entries(o))n==="generatedSections"&&r.generatedSections?r.generatedSections={...r.generatedSections,...a}:a!==void 0&&(r[n]=a);return r}},R="__end__";function se(e){return{userPrompt:e.userPrompt||"",screenshot:e.screenshot||null,currentHtml:e.currentHtml||"",websiteInfo:e.websiteInfo||(typeof window<"u"?window.lc_editor_website_info:"")||"",pageTextContent:e.pageTextContent||"",framework:e.framework||{name:"Bootstrap",version:"5.3"},selectedModel:e.selectedModel||"openai/gpt-5.1-codex",structuredMode:!!e.structuredMode,predefinedSections:Array.isArray(e.predefinedSections)?e.predefinedSections:[],awarenessMode:e.awarenessMode||"section",phaseThreshold:e.phaseThreshold??null,fullPageMode:!!e.fullPageMode,forceSequential:!!e.forceSequential,imageSource:e.imageSource||"placeholder",imageModel:e.imageModel||"fal-ai/flux-2-pro",imageSize:e.imageSize||"auto",imageStyle:e.imageStyle||"auto",helperModel:e.helperModel||"anthropic/claude-haiku-4.5",previousImagePrompts:[],promptSeriesSummary:null,uiKit:e.uiKit||"",neighborContext:e.neighborContext||"",pageContext:e.pageContext||"",designContext:e.designContext||"",imageDifferentiate:e.imageDifferentiate??void 0,imagePreserveAspect:e.imagePreserveAspect??void 0,globalImagePrompt:e.globalImagePrompt||"",referenceImageUrl:e.referenceImageUrl||"",imageUrl:e.imageUrl||"",editPreset:e.editPreset||"",storytellingPreset:e.storytellingPreset||"STORYBRAND",narrativePlan:e.narrativePlan||null,sections:[],currentSectionIndex:0,mode:e.screenshot?"screenshot-to-code":e.fullPageMode||e.structuredMode||Array.isArray(e.predefinedSections)&&e.predefinedSections.length>0?"generate":e.currentHtml?"edit":"generate",generatedSections:{},finalHtml:"",currentStep:"idle",error:null,progress:{completed:0,total:0,message:"Starting..."}}}var b=null,X=!0,v={enabled:!1,project:"livecanvas-ai",serverConfigured:!1},Ce=new Map,x={header:"background: #6366f1; color: white; padding: 2px 8px; border-radius: 4px; font-weight: bold;",node:"background: #10b981; color: white; padding: 2px 6px; border-radius: 3px;",llm:"background: #f59e0b; color: black; padding: 2px 6px; border-radius: 3px;",error:"background: #ef4444; color: white; padding: 2px 6px; border-radius: 3px;",success:"background: #22c55e; color: white; padding: 2px 6px; border-radius: 3px;",info:"color: #6b7280;",time:"color: #8b5cf6; font-weight: bold;",langsmith:"background: #059669; color: white; padding: 2px 6px; border-radius: 3px;"};function Pt(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){let t=Math.random()*16|0;return(e==="x"?t:t&3|8).toString(16)})}function ye(){return{restUrl:window.lc_editor_rest_api_url||"/wp-json/",nonce:window.lc_editor_rest_api_nonce||""}}async function Nt(){let{restUrl:e,nonce:t}=ye();try{let o=await fetch(`${e}livecanvas/v1/ai/trace/status`,{headers:{"X-WP-Nonce":t}});if(o.ok){let r=await o.json();return v.serverConfigured=r.configured,r.project&&(v.project=r.project),r.configured}}catch(o){console.log("%c\u26A0\uFE0F Could not check LangSmith status:",x.info,o.message)}return!1}async function we(e,t,o,r=null){if(!v.enabled||!v.serverConfigured)return null;let{restUrl:n,nonce:a}=ye(),i=Pt();try{let s=await fetch(`${n}livecanvas/v1/ai/trace/run`,{method:"POST",headers:{"Content-Type":"application/json","X-WP-Nonce":a},body:JSON.stringify({id:i,name:e,run_type:t,inputs:o,project_name:v.project,parent_run_id:r,start_time:new Date().toISOString()})});if(s.ok){let l=await s.json();return console.log("%c\u{1F4E4} LangSmith run created:",x.langsmith,e,`(${i.substring(0,8)}...)`),l.run_id||i}else{let l=await s.json();return console.error("%c\u274C LangSmith createRun failed:",x.error,l.message),null}}catch(s){return console.error("%c\u274C LangSmith createRun error:",x.error,s.message),null}}async function be(e,t,o=null){if(!v.enabled||!v.serverConfigured||!e)return;let{restUrl:r,nonce:n}=ye();try{let a=await fetch(`${r}livecanvas/v1/ai/trace/run`,{method:"PATCH",headers:{"Content-Type":"application/json","X-WP-Nonce":n},body:JSON.stringify({run_id:e,outputs:t,error:o?String(o):null,end_time:new Date().toISOString()})});if(a.ok)console.log("%c\u{1F4E5} LangSmith run updated:",x.langsmith,`(${e.substring(0,8)}...)`);else{let i=await a.json();console.error("%c\u274C LangSmith updateRun failed:",x.error,i.message)}}catch(a){console.error("%c\u274C LangSmith updateRun error:",x.error,a.message)}}async function xe(e,t={}){if(!X)return null;let o=`run_${Date.now()}_${Math.random().toString(36).substr(2,9)}`;if(b={id:o,name:e,startTime:performance.now(),startTimestamp:new Date().toISOString(),input:t,nodes:[],llmCalls:[],output:null,error:null,langSmithRunId:null},v.enabled&&v.serverConfigured){let r=await we(e,"chain",le(t));b.langSmithRunId=r,r&&Ce.set(o,r)}return console.log(`%c\u{1F680} TRACE START %c${e}`,x.header,"font-weight: bold; color: #6366f1;"),console.log("%cTrace ID:",x.info,o),console.log("%cInput:",x.info,Ot(t)),console.groupCollapsed("%c\u{1F4CB} Full Input",x.info),console.log(t),console.groupEnd(),o}async function $(e,t="start",o={}){if(!X||!b)return;let r=performance.now(),n=(r-b.startTime).toFixed(0);if(t==="start"){console.log(`%c\u25B6 NODE %c${e} %c+${n}ms`,x.node,"font-weight: bold;",x.time);let a={name:e,startTime:r,startTimestamp:new Date().toISOString(),endTime:null,duration:null,output:null,langSmithRunId:null};if(v.enabled&&v.serverConfigured&&b.langSmithRunId){let i=await we(e,"chain",le(o),b.langSmithRunId);a.langSmithRunId=i}b.nodes.push(a)}else if(t==="end"){let a=b.nodes.find(s=>s.name===e&&!s.endTime);a&&(a.endTime=r,a.duration=r-a.startTime,a.output=o,a.langSmithRunId&&await be(a.langSmithRunId,le(o)));let i=a?a.duration.toFixed(0):"?";console.log(`%c\u2713 NODE %c${e} %ccompleted in ${i}ms`,x.success,"font-weight: bold;",x.time),o&&Object.keys(o).length>0&&(console.groupCollapsed("%c  \u2514\u2500 Output summary",x.info),console.log(Mt(o)),console.groupEnd())}}async function Se(e,t,o=null,r=null){if(!X||!b)return;let n=performance.now(),a=(n-b.startTime).toFixed(0),i={model:e,timestamp:n,messages:t.map(s=>({role:s.role,contentLength:s.content?.length||0,contentPreview:typeof s.content=="string"?s.content.substring(0,100)+(s.content.length>100?"...":""):"[complex content]"})),response:o?{contentLength:o.choices?.[0]?.message?.content?.length||0,contentPreview:o.choices?.[0]?.message?.content?.substring(0,100)||""}:null,error:r?.message||null};if(b.llmCalls.push(i),v.enabled&&v.serverConfigured&&b.langSmithRunId){let s={model:e,messages:t.map(c=>({role:c.role,content:typeof c.content=="string"?c.content.substring(0,1e4):"[complex content]"}))},l=o?{choices:o.choices?.map(c=>({message:{role:c.message?.role,content:c.message?.content?.substring(0,1e4)},finish_reason:c.finish_reason})),usage:o.usage}:null,d=await we(`LLM: ${e}`,"llm",s,b.langSmithRunId);d&&await be(d,l,r?.message)}if(r)console.log(`%c\u2717 LLM %c${e} %cFAILED +${a}ms`,x.error,"font-weight: bold;",x.time),console.error("  \u2514\u2500 Error:",r.message);else{console.log(`%c\u26A1 LLM %c${e} %c+${a}ms`,x.llm,"font-weight: bold;",x.time);let s=t.reduce((d,c)=>d+(c.content?.length||0),0)/4,l=(o?.choices?.[0]?.message?.content?.length||0)/4;console.log(`%c  \u2514\u2500 ~${Math.round(s)} input tokens \u2192 ~${Math.round(l)} output tokens`,x.info)}}async function J(e=null,t=null){if(!X||!b)return;let o=performance.now(),r=((o-b.startTime)/1e3).toFixed(2);b.output=e,b.error=t,b.endTime=o,b.totalDuration=o-b.startTime,b.langSmithRunId&&(await be(b.langSmithRunId,le(e),t),Ce.delete(b.id)),console.log(""),t?(console.log(`%c\u274C TRACE FAILED %c${b.name} %c${r}s`,x.error,"font-weight: bold;",x.time),console.error("Error:",t)):console.log(`%c\u2705 TRACE COMPLETE %c${b.name} %c${r}s`,x.success,"font-weight: bold;",x.time),console.groupCollapsed("%c\u{1F4CA} Trace Summary",x.header),console.log("Total Duration:",`${r}s`),console.log("Nodes Executed:",b.nodes.length),console.log("LLM Calls:",b.llmCalls.length),console.log("LangSmith:",b.langSmithRunId?`\u2705 Sent (${b.langSmithRunId.substring(0,8)}...)`:"\u274C Not sent"),console.log("Node Breakdown:"),b.nodes.forEach(a=>{console.log(`  - ${a.name}: ${a.duration?.toFixed(0)||"?"}ms`)}),console.groupEnd();let n={...b};return b=null,n}function le(e){if(!e)return{};try{let t=new WeakSet;return JSON.parse(JSON.stringify(e,(r,n)=>{if(typeof n=="object"&&n!==null){if(t.has(n))return"[Circular]";t.add(n)}return typeof n=="string"&&n.length>1e4?n.substring(0,1e4)+"... [truncated]":typeof n=="function"?"[Function]":n}))}catch(t){return{error:"Failed to sanitize data",message:t.message}}}function Ot(e){return{prompt:e.userPrompt?.substring(0,50)+(e.userPrompt?.length>50?"...":""),model:e.selectedModel,mode:e.mode,hasHtml:!!e.currentHtml,htmlLength:e.currentHtml?.length||0}}function Mt(e){let t={};for(let[o,r]of Object.entries(e))typeof r=="string"&&r.length>100?t[o]=r.substring(0,100)+`... (${r.length} chars)`:typeof r=="object"&&r!==null?t[o]=`[Object: ${Object.keys(r).join(", ")}]`:t[o]=r;return t}function Ue(e){X=e,console.log(`%cTracing ${e?"ENABLED":"DISABLED"}`,e?x.success:x.error)}async function Ge(e){Object.assign(v,e),v.enabled?await Nt()?console.log("%c\u{1F517} LangSmith enabled via server proxy:",x.langsmith,{project:v.project,serverConfigured:!0}):(console.log("%c\u26A0\uFE0F LangSmith API key not configured on server",x.error),console.log("%c   Add your API key in WordPress: LiveCanvas \u2192 AI Settings",x.info),v.enabled=!1):(v.serverConfigured=!1,console.log("%cLangSmith disabled",x.info))}function De(){return v.enabled&&v.serverConfigured}function He(){return{enabled:v.enabled,project:v.project,serverConfigured:v.serverConfigured}}function $t(e){return new Promise(t=>setTimeout(t,e))}function kt(e){let t=e.message?.toLowerCase()||"";return!!(t.includes("curl error")||t.includes("timeout")||t.includes("network")||t.includes("connection")||t.includes("aborted")||t.includes("transfer closed")||t.includes("empty response")||e.status>=500)}async function ze(e,t,o={}){let{maxRetries:r=2,signal:n,...a}=o,i;for(let s=0;s<=r;s++)try{if(n?.aborted)throw new Error("Request was cancelled");return await Lt(e,t,{signal:n,...a})}catch(l){if(i=l,l.name==="AbortError"||n?.aborted||l.status>=400&&l.status<500&&l.status!==429||!kt(l)&&l.status!==429||s===r)throw l;let d=Math.min(1e3*Math.pow(2,s),8e3);console.warn(`[API] Attempt ${s+1}/${r+1} failed: ${l.message}. Retrying in ${d}ms...`),await $t(d)}throw i}async function Lt(e,t,o={}){let r=window.lc_editor_ai_proxy_url,n=window.lc_editor_rest_api_nonce,{signal:a}=o;if(!r)throw new Error("AI proxy URL not configured. Please ensure LiveCanvas is properly initialized.");let i=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json","X-WP-Nonce":n},body:JSON.stringify({provider:e,payload:t}),signal:a});if(!i.ok){let d={};try{let u=await i.text();u&&(d=JSON.parse(u))}catch{}let c=d.message||d.error?.message||`HTTP error ${i.status}`,p=new Error(c);throw p.status=i.status,p.data=d,p}let s=await i.text();if(!s)throw new Error("Empty response from AI provider. The request may have timed out.");let l;try{l=JSON.parse(s)}catch{throw new Error(`Invalid JSON response from AI provider: ${s.substring(0,100)}...`)}return l}async function Fe(){let e=window.lc_editor_rest_api_url,t=window.lc_editor_rest_api_nonce;return(await fetch(`${e}livecanvas/v1/ai/status`,{headers:{"X-WP-Nonce":t}})).json()}function Q(e){if(e.includes("/"))return"openrouter";let t=window.lc_editor_has_openrouter_key,o=window.lc_editor_has_openai_key;return t?"openrouter":o?"openai":"openrouter"}function ce(e,t){return e.includes("/")?e:t==="openrouter"&&["gpt-5.1","gpt-5.1-codex","gpt-5.1-mini","gpt-5","gpt-5-mini","gpt-4.1","gpt-4.1-mini","gpt-4o","gpt-4o-mini","o4-mini","o3-mini"].some(r=>e.startsWith(r))?`openai/${e}`:e}async function I(e,t,o={}){let r=Q(e),n=ce(e,r),{signal:a,...i}=o,s={model:n,messages:t,...i};!s.temperature&&s.temperature!==0&&(s.temperature=.3),s.max_tokens||(s.max_tokens=8e3);try{let l=await ze(r,s,{signal:a,maxRetries:2});return Se(n,t,l),l}catch(l){throw Se(n,t,null,l),l}}async function Be(e,t,o,r={}){let n=e||"google/gemini-3-pro-preview",a=Q(n),i=ce(n,a),{signal:s,...l}=r,d=[{role:"user",content:[{type:"image_url",image_url:{url:t.startsWith("data:")?t:`data:image/png;base64,${t}`}},{type:"text",text:o}]}],c={model:i,messages:d,temperature:.2,max_tokens:12e3,...l};return ze(a,c,{signal:s,maxRetries:2})}async function Ie(e){$("planner","start");let t={completed:0,total:4,message:"Analyzing your request..."};if(e.predefinedSections&&Array.isArray(e.predefinedSections)&&e.predefinedSections.length>0){console.log("[Planner] Using predefined sections from UI:",e.predefinedSections.length);let o=e.predefinedSections.map(r=>({id:r.id||r.type||"section",label:r.label||r.name||r.type||"Section",goal:r.goal||r.prompt||`Generate a ${r.label||r.type} section`,type:r.type||"section",prompt:r.prompt||""}));return{currentStep:"planning",progress:{...t,total:o.length*3+1,message:`Using ${o.length} predefined section(s).`},sections:o}}if(e.mode==="edit")return{currentStep:"planning",progress:t,sections:[{id:"main",label:"Main Content",goal:e.userPrompt,type:"section"}]};if(e.mode==="screenshot-to-code")return{currentStep:"planning",progress:{...t,message:"Analyzing screenshot..."},sections:[{id:"screenshot-conversion",label:"Screenshot Conversion",goal:"Convert screenshot to code",type:"section"}]};try{let r=(await I(e.selectedModel,[{role:"system",content:`You are a web page planner. Analyze the user's request and identify the distinct sections needed.

Output ONLY a JSON array of sections like:
[
  {"id": "hero", "label": "Hero Section", "goal": "Create an attention-grabbing hero with headline and CTA", "type": "section"},
  {"id": "features", "label": "Features Section", "goal": "Showcase 3-4 key features with icons", "type": "section"}
]

Keep it practical - most pages need 3-6 sections maximum.`},{role:"user",content:`Plan the page structure for: ${e.userPrompt}

Business context: ${e.websiteInfo||"Not provided"}`}],{temperature:.3})).choices[0]?.message?.content||"[]",n;try{let a=r.match(/\[[\s\S]*\]/);n=a?JSON.parse(a[0]):[]}catch{n=[{id:"main",label:"Main Content",goal:e.userPrompt,type:"section"}]}return{currentStep:"planning",progress:{...t,total:n.length*3+1,message:`Planning complete. Found ${n.length} section(s) to generate.`},sections:n}}catch(o){return console.error("Planner error:",o),{currentStep:"planning",progress:t,sections:[{id:"main",label:"Main Content",goal:e.userPrompt,type:"section"}],error:null}}}var _e={STORYBRAND:{label:"The Guide (StoryBrand Style)",description:"Positions the customer as the Hero and you as the Guide. Follows: Hero -> Problem -> Guide -> Plan -> Success.",systemPrompt:`You are a StoryBrand Guide. Your goal is to rewrite the page content to follow the StoryBrand framework:
1. The Character (The user) is the Hero, not your company.
2. They have a Problem (Villain).
3. They meet a Guide (Your company) who understands their fear.
4. The Guide gives them a Plan.
5. And calls them to Action.
6. That results in Success (and avoids Failure).

For each section, determine which part of this framework it should fulfill.
- Header/Hero: Identifies the Hero's desire.
- Features/Benefits: How it solves the Problem.
- Testimonials/About: Establishes the Guide's authority/empathy.
- Pricing/Steps: The Plan.
- CTA: The Call to Action.`,defaultGoal:"Clarify our message so customers understand exactly how we solve their problem."},AIDA:{label:"The Salesman (AIDA)",description:"Classic direct response formula: Attention, Interest, Desire, Action.",systemPrompt:`You are a Direct Response Copywriter. specific goal is to maximize conversions using the AIDA framework:
1. Attention: Hook the reader immediately (Headlines).
2. Interest: Engage their mind with interesting facts/benefits (Intro/Features).
3. Desire: Make them want it by appealing to emotions/outcomes (Testimonials/Benefits).
4. Action: Tell them exactly what to do next (CTAs).

Ensure every section drives the user down this funnel. Use punchy, active language.`,defaultGoal:"Drive immediate conversions by taking the user through a persuasive journey."},PAS:{label:"The Problem Solver (PAS)",description:"Problem, Agitation, Solution. Highly effective for landing pages addressing specific pain points.",systemPrompt:`You are an Empathic Problem Solver. Use the PAS framework:
1. Problem: Clearly state the issue the user is facing. Validating their struggle.
2. Agitation: Rub salt in the wound. Describe the emotional cost of not solving it. Make it urgent.
3. Solution: Reveal your product/service as the perfect relief.

Focus heavily on the "Before vs After" state.
- Early sections: Focus on Problem/Agitation.
- Later sections: Focus entirely on the Solution and relief.`,defaultGoal:"Agitate the user's pain points to make our solution irresistible."},VISIONARY:{label:"The Visionary (Future Pacing)",description:"Focuses on the 'Dream Outcome'. Imagine if... statements. Inspiring and high-level.",systemPrompt:`You are a Visionary Leader. Your tone is inspiring, forward-looking, and premium.
Focus on "Future Pacing" - describing the user's life AFTER they use the product.
Use phrases like "Imagine...", "What if...", "The future of...".
Avoid technical jargon. Focus on the feeling of success and the lifestyle change.`,defaultGoal:"Inspire the user with a vision of their future success."},MINIMALIST:{label:"The Essentialist (Minimal)",description:"Cuts the fluff. Direct, clear, and concise. No marketing jargon.",systemPrompt:`You are an Essentialist Editor.
Your goal is radical clarity.
- Remove all fluff, adverbs, and marketing buzzwords.
- Use short sentences.
- Be direct and honest.
- If a sentence doesn't add new information, delete it.
- Tone: Confident, calm, understated.`,defaultGoal:"Communicate our value with absolute clarity and zero fluff."}};async function je(e){$("narrative_planner","start");let t=e.storytellingPreset||"STORYBRAND",o=_e[t];o||console.warn(`Unknown storytelling preset: ${t}, falling back to STORYBRAND`);let r=o||_e.STORYBRAND,n=e.userPrompt||r.defaultGoal;if(!e.currentHtml||e.currentHtml.trim().length<50)return{currentStep:"error",error:"No HTML content to analyze. Please select a section or page first."};let a={completed:0,total:10,message:`Analyzing content structure with "${r.label}" strategy...`};try{let i=`${r.systemPrompt}

YOUR TASK:
1. Analyze the provided HTML structure.
2. Create a cohesive Narrative Plan that ties all sections together.
3. For EACH logical section (header, features, testimonials, etc.), provide a specific rewriting instruction.

OUTPUT FORMAT:
Return ONLY a JSON object:
{
  "global_theme": "One sentence summary of the overarching message",
  "sections": [
    {
      "id_selector": "Unique CSS selector or ID to identify the section (e.g. 'section:nth-of-type(1)' or '#hero')",
      "role": "The role of this section (e.g. 'The Hook' or 'The Evidence')",
      "instruction": "Specific instruction on how to rewrite text in this section to fit the narrative."
    }
  ]
}
`,l=(await I(e.selectedModel,[{role:"system",content:i},{role:"user",content:`Analyze this Page HTML and create a ${r.label} narrative plan.
Global Goal: ${n}

HTML Content:
${e.currentHtml}
`}],{temperature:.4})).choices[0]?.message?.content||"{}",d;try{let c=l.match(/\{[\s\S]*\}/);d=c?JSON.parse(c[0]):{sections:[]}}catch(c){throw console.warn("Failed to parse narrative plan JSON:",c),new Error("Could not generate a valid narrative plan.")}return(!d.sections||!Array.isArray(d.sections))&&(d.sections=[{id_selector:"body",role:"Full Page",instruction:n}]),{currentStep:"planning",progress:{...a,total:d.sections.length+1,message:`Created narrative plan with ${d.sections.length} sections.`},narrativePlan:d,sections:d.sections.map((c,p)=>({id:`section_${p}`,selector:c.id_selector,label:c.role,goal:c.instruction,type:"rewrite_section"}))}}catch(i){return console.error("Narrative Planner error:",i),{currentStep:"error",error:i.message}}}function Rt(e){let t={none:`## IMAGES - CRITICAL INSTRUCTION
Do NOT include any <img> tags in your output. 
Instead of images, use:
- Font Awesome icons (<i class="fa fa-icon-name"></i>)
- SVG icons inline
- Colored divs with icons inside for visual elements
- Text-only design patterns`,placeholder:`## IMAGES
Use placehold.co for ALL images with appropriate dimensions and colors.
Format: https://placehold.co/WIDTHxHEIGHT/BGCOLOR/TEXTCOLOR?text=Label
Examples:
- Hero: https://placehold.co/1200x600/6366f1/ffffff?text=Hero+Image
- Avatar: https://placehold.co/100x100/e2e8f0/64748b?text=Avatar
- Card: https://placehold.co/400x300/f1f5f9/94a3b8?text=Feature
Match dimensions to the design context and use brand-appropriate colors.`,unsplash:`## IMAGES
Images will be automatically searched and retrieved from Unsplash using the section context.
Use placeholder images that will be replaced with real Unsplash photos during generation.
Format: https://placehold.co/WIDTHxHEIGHT/e2e8f0/94a3b8?text=Image
The system will automatically:
- Analyze the section context and goals
- Generate appropriate search queries
- Find relevant Unsplash photos
- Replace placeholders with real image URLs
You don't need to specify Unsplash URLs manually - just use placeholders.`,ai_gen:`## IMAGES - AI GENERATION MODE
Use placeholder images with a special attribute for later AI generation.
Format: https://placehold.co/WIDTHxHEIGHT/e2e8f0/94a3b8?text=AI+Image
Add this attribute to each img: data-ai-prompt="detailed description of desired image"
Example: <img src="https://placehold.co/800x400/e2e8f0/94a3b8?text=AI+Image" data-ai-prompt="Professional team meeting in modern glass office, warm lighting, diverse group" alt="Team collaboration">
The data-ai-prompt will be used to generate images with AI after code generation.`};return t[e]||t.placeholder}function qe(){return`You are a UI/UX design analyst specializing in extracting design systems from HTML code.

## YOUR TASK
Analyze the provided HTML and extract a concise, actionable UI Kit specification.

## OUTPUT FORMAT (REQUIRED)
Return ONLY a plain text specification with these sections. No markdown, no code blocks, just text:

Colors: [primary color, secondary, accent, background, text colors - use hex codes when visible]
Typography: [font families, base size, heading styles, weights]
Spacing: [padding/margin patterns, section spacing, gaps]
Corners: [border-radius patterns]
Shadows: [shadow styles used]
Style: [2-3 word aesthetic description]
Components: [button styles, card patterns, key UI elements]

## EXTRACTION RULES
1. Look for Bootstrap classes: bg-primary, btn-*, text-*, p-*, m-*, rounded-*, shadow-*
2. Look for Tailwind classes: bg-[color], text-[size], p-[number], rounded-[size]
3. Look for inline styles: style="color: #xxx", style="background: xxx"
4. Look for CSS custom properties: var(--color-primary), var(--spacing-*)
5. Identify repeated patterns across sections
6. Note the overall visual style (modern, minimal, corporate, playful, etc.)

## BOOTSTRAP CLASS REFERENCE
- p-1=4px, p-2=8px, p-3=16px, p-4=24px, p-5=48px
- rounded=4px, rounded-lg=8px, rounded-xl=12px, rounded-pill=50px
- shadow-sm=subtle, shadow=medium, shadow-lg=prominent

## EXAMPLE OUTPUT
Colors: primary=#6366f1 (indigo), accent=#22c55e (green), bg=#ffffff, text=#1e293b
Typography: Inter/system fonts, 16px base, headings fw-600, body fw-400
Spacing: 8px grid, sections py-5 (48px), cards p-4 (24px), gap-4
Corners: rounded-lg (8px) on cards, rounded on buttons
Shadows: shadow-sm on cards, none on buttons
Style: Modern, clean, SaaS
Components: Solid primary buttons with hover, white cards with subtle border, icon+text feature blocks

## IF PAGE IS EMPTY OR TOO GENERIC
If you cannot identify a clear design pattern (e.g., page has no styled sections, only default WordPress elements):
Return: "Could not extract a distinct UI Kit. The page appears empty or uses only default styles. Please select a preset or enter specifications manually."

IMPORTANT: Always return something useful. Even if patterns are unclear, make reasonable inferences from what you see.`}function Ye(e){return`You are an expert frontend developer with 15+ years of experience in ${e.name} ${e.version}.

## OUTPUT FORMAT - CRITICAL
- Return ONLY raw HTML code
- NO markdown formatting (no \`\`\`html blocks)
- NO explanations, comments about what you did, or meta-text
- Start directly with the first HTML tag
- End with the last closing HTML tag

## CODE REQUIREMENTS
1. **Framework Compliance**: Use ONLY ${e.name} ${e.version} classes
2. **LiveCanvas Compatibility**: Add \`editable="rich"\` attribute to DIVs wrapping text content
3. **Responsive Design**: Mobile-first approach with proper breakpoints
4. **Semantic HTML5**: Use section, article, nav, header, footer, main, aside appropriately
5. **Accessibility**: Include aria-labels, alt texts, and proper heading hierarchy
6. **No Inline Styles**: Use framework utility classes exclusively

## JAVASCRIPT RULES (if needed)
- Single inline <script> tag only
- Must include comment: //lc-needs-hard-refresh
- Place inside the root HTML element

## CONTENT RULES
- NEVER output Lorem Ipsum - always use contextual placeholder text
- If editing existing HTML, preserve structure unless explicitly asked to change it
- Match the visual style and patterns of the existing code

## ${e.name.toUpperCase()} ${e.version} SPECIFIC
${e.name==="Bootstrap"?`
- Layout: container, container-fluid, row, col-* grid system
- Spacing: p-*, m-*, gap-* utilities
- Typography: fs-*, fw-*, text-* classes
- Components: card, btn, badge, alert, navbar
- Responsive: col-12 col-md-6 col-lg-4 pattern
- Flexbox: d-flex, justify-content-*, align-items-*
`:""}
${e.name==="Tailwind"?`
- Layout: flex, grid, container mx-auto
- Spacing: p-*, m-*, gap-*, space-*
- Typography: text-*, font-*, leading-*
- Responsive: sm:, md:, lg:, xl: prefixes
- Dark mode: dark: prefix when appropriate
`:""}`}function de(){return`You are a senior copywriter and UX writer specializing in web content.

## OUTPUT FORMAT - CRITICAL
- Return ONLY the complete HTML with improved text
- NO markdown formatting
- NO explanations or meta-commentary
- Preserve ALL HTML structure, classes, IDs, and attributes EXACTLY

## YOUR TASK
Improve the text content while keeping the HTML structure identical.

## CONTENT GUIDELINES
1. **Headlines**: Punchy, benefit-focused, under 10 words
2. **Body Copy**: Clear, scannable, active voice
3. **CTAs**: Action-oriented verbs ("Get Started", "Discover", "Transform")
4. **Tone**: Match the brand voice from provided context
5. **Length**: Keep similar word counts unless specifically asked

## WHAT TO IMPROVE
- Replace generic phrases with specific, engaging copy
- Fix grammar, spelling, and awkward phrasing
- Improve readability and flow
- Add emotional resonance where appropriate
- Ensure consistency across the page

## WHAT NOT TO CHANGE
- HTML tags and structure
- CSS classes and IDs
- Attributes (href, src, data-*, etc.)
- JavaScript code
- Image sources`}function We(e){let t=[];e.uiKit&&t.push(`## DESIGN SYSTEM (UI KIT) - FOLLOW STRICTLY
<ui-kit>
${e.uiKit}
</ui-kit>

You MUST match these design specifications exactly:
- Use the same colors, typography, and spacing patterns
- Apply the same border-radius and shadow styles
- Maintain visual consistency with the existing design`),e.imageSource&&t.push(Rt(e.imageSource)),e.mode==="edit"&&e.currentHtml&&t.push(`## CURRENT HTML TO EDIT
<current-html>
${e.currentHtml}
</current-html>

Modify this HTML according to the task below. Preserve structure unless explicitly asked to change it.`),e.neighborContext&&t.push(`## SURROUNDING SECTIONS (for style reference)
<neighbor-sections>
${e.neighborContext}
</neighbor-sections>

Match the visual style, spacing, and component patterns of these neighboring sections.`),e.websiteInfo&&t.push(`## BUSINESS CONTEXT
<business-info>
${e.websiteInfo}
</business-info>

Use this information to make content relevant and on-brand.`),e.pageTextContent&&t.push(`## EXISTING PAGE CONTENT
<page-content>
${e.pageTextContent.substring(0,2e3)}${e.pageTextContent.length>2e3?"...[truncated]":""}
</page-content>

Ensure new content is coherent with existing page content.`);let o=Object.values(e.generatedSections||{}).filter(r=>r.status==="completed"&&r.code);return o.length>0&&t.push(`## PREVIOUSLY GENERATED SECTIONS
<previous-sections>
${o.map(r=>`<!-- ${r.id} -->
${r.code.substring(0,500)}...`).join(`

`)}
</previous-sections>

Maintain visual consistency with these sections.`),t.push(`## YOUR TASK
${e.userPrompt}

Remember: Output ONLY the raw HTML code, no markdown formatting, no explanations.`),t.join(`

`)}function Ke(e,t){let o=[];return o.push(`## HTML TO IMPROVE
<html>
${t}
</html>

Improve the text content in this HTML.`),e.websiteInfo&&o.push(`## BRAND CONTEXT
<brand>
${e.websiteInfo}
</brand>

Match this brand voice and incorporate relevant details.`),o.push(`## REQUIREMENTS
- Keep ALL HTML structure exactly the same
- Only modify text between tags
- Make copy more engaging and specific
- Ensure CTAs are compelling
- Fix any grammar issues

Output the complete HTML with improved text only.`),o.join(`

`)}function Ve(e){let t=[];return t.push(`## TASK
Convert this screenshot into production-ready ${e.framework.name} ${e.framework.version} HTML code.`),e.websiteInfo&&t.push(`## BRAND CONTEXT
<brand>
${e.websiteInfo}
</brand>

Incorporate relevant brand details where appropriate.`),e.userPrompt&&t.push(`## ADDITIONAL INSTRUCTIONS
${e.userPrompt}`),t.push(`## REQUIREMENTS
1. Recreate the layout as accurately as possible
2. Use ${e.framework.name} ${e.framework.version} classes
3. Make it responsive (mobile-first)
4. Add editable="rich" to text container DIVs
5. Use placeholder images with correct dimensions
6. Extract and apply the color scheme

Output ONLY the HTML code, no explanations or markdown.`),t.join(`

`)}function Ct(e){if(!e)return"";let t=e.trim();return t.startsWith("```html")?t=t.slice(7):t.startsWith("```")&&(t=t.slice(3)),t.endsWith("```")&&(t=t.slice(0,-3)),t.trim()}async function Xe(e){let t=e.sections[e.currentSectionIndex];if(!t)return{currentStep:"error",error:"No section to process"};let o={...e.progress,message:`Generating code for ${t.label}...`};try{let r="";e.mode==="screenshot-to-code"&&e.screenshot?r=(await Be("google/gemini-3-pro-preview",e.screenshot,Ve(e),{temperature:.2,max_tokens:8e3})).choices[0]?.message?.content||"":r=(await I(e.selectedModel,[{role:"system",content:Ye(e.framework)},{role:"user",content:We({...e,userPrompt:t.goal||e.userPrompt})}],{temperature:.3,max_tokens:8e3})).choices[0]?.message?.content||"",r=Ct(r);let n={id:t.id,code:r,text:"",imagePrompts:[],status:"coded",error:null};return{currentStep:"coding",progress:{...o,completed:e.progress.completed+1,message:`Code generated for ${t.label}`},generatedSections:{[t.id]:n}}}catch(r){return console.error("Coder error:",r),{currentStep:"coding",progress:{...o,message:`Error generating code: ${r.message}`},generatedSections:{[t.id]:{id:t.id,code:"",text:"",imagePrompts:[],status:"error",error:r.message}}}}}function Je(e){if(!e)return"";let t=e.trim();return t.startsWith("```html")?t=t.slice(7):t.startsWith("```")&&(t=t.slice(3)),t.endsWith("```")&&(t=t.slice(0,-3)),t.trim()}async function Qe(e){let t=e.sections[e.currentSectionIndex];if(!t)return{currentStep:"error",error:"No section to process"};let o=e.generatedSections[t.id];if(!o||o.status==="error"||!o.code)return{currentStep:"writing",progress:{...e.progress,completed:e.progress.completed+1,message:`Skipping text refinement for ${t.label} (no code)`}};let r={...e.progress,message:`Refining text for ${t.label}...`};try{let n=e.selectedModel.includes("codex")?e.selectedModel.replace("-codex",""):e.selectedModel,i=(await I(n,[{role:"system",content:de()},{role:"user",content:Ke(e,o.code)}],{temperature:.5,max_tokens:8e3})).choices[0]?.message?.content||o.code;return i=Je(i),{currentStep:"writing",progress:{...r,completed:e.progress.completed+1,message:`Text refined for ${t.label}`},generatedSections:{[t.id]:{...o,code:i,text:"refined",status:"written"}}}}catch(n){return console.error("Writer error:",n),{currentStep:"writing",progress:{...r,completed:e.progress.completed+1,message:`Text refinement skipped for ${t.label}: ${n.message}`},generatedSections:{[t.id]:{...o,status:"written"}}}}}async function Ze(e){$("rewriteSection","start");let t=e.currentSectionIndex||0,o=e.sections?.[t];if(!o)return{currentStep:"error",error:"No section to process"};let r=e.progress||{completed:0,total:1,message:""},n={...r,message:`Rewriting ${o.label||"section"}...`},a="",i=e.generatedSections||{};for(let l=0;l<t;l++){let d=e.sections[l];if(!d)continue;let c=d.id,u=(i[c]?.code||"").replace(/<[^>]*>/g," ").replace(/\s+/g," ").substring(0,500);a+=`Section ${l+1} summary: ${u}
`}let s="";try{if(typeof DOMParser<"u"){let g=new DOMParser().parseFromString(e.currentHtml,"text/html").querySelector(o.selector);g&&(s=g.outerHTML)}if(!s&&o.html&&(s=o.html),!s)throw new Error(`Could not find content for selector: ${o.selector}`);let d=`You are a Content Editor. 
Global Narrative Goal: ${e.narrativePlan?.global_theme||""}

Your task is to REWRITE the text content of the provided HTML section.
Specific Instruction: ${o.goal}

CONTEXT FROM PREVIOUS SECTIONS:
${a}

RULES:
1. Keep ALL HTML structure, classes, and IDs exactly as they are.
2. Only change the text inside tags.
3. Ensure the tone matches the global goal.
4. Maintain smooth transitions from previous sections.
5. Return ONLY the modified HTML.`,p=(await I(e.selectedModel,[{role:"system",content:d},{role:"user",content:s}],{temperature:.5})).choices[0]?.message?.content||s;return p=Je(p),$("rewriteSection","end",{sectionId:o.id}),{currentStep:"writing",progress:{...n,completed:r.completed+1},generatedSections:{[o.id]:{id:o.id,selector:o.selector,code:p,status:"completed"}}}}catch(l){return console.error("Rewrite Section error:",l),{currentStep:"writing",progress:{...n,completed:r.completed+1,message:`Error rewriting ${o.label}: ${l.message}`},generatedSections:{[o.id]:{id:o.id,selector:o.selector,code:s||"<!-- Error reading section -->",status:"error",error:l.message}}}}}async function pe(e,t="anthropic/claude-haiku-4.5"){if(!e||e.length<2)return null;let o=e.map((a,i)=>`${i+1}. "${a.prompt}" (context: ${a.context})`).join(`
`),r=`You are an image series analyst. Analyze the given image prompts and extract a structured summary that will help generate complementary images.

OUTPUT FORMAT (JSON only, no markdown):
{
  "dominant_style": "brief description of the visual style (e.g., 'corporate photography, clean lighting')",
  "color_palette": ["primary colors used", "secondary colors"],
  "mood": "overall emotional tone (e.g., 'professional, warm, trustworthy')",
  "subjects_covered": ["list of subjects/scenes already depicted"],
  "subjects_to_avoid": ["subjects that would be redundant"],
  "suggested_angles": ["fresh perspectives or subjects that would complement the series"],
  "technical_notes": "any consistent technical aspects (lighting, composition style)"
}

Be concise. Return ONLY valid JSON.`,n=`Analyze this image prompt series:

${o}

Extract the unifying style elements and suggest how to diversify future images while maintaining cohesion.`;try{let i=(await I(t,[{role:"system",content:r},{role:"user",content:n}],{temperature:.3,max_tokens:500})).choices?.[0]?.message?.content||"",s=i,l=i.match(/```(?:json)?\s*([\s\S]*?)```/);l&&(s=l[1].trim());let d=s.match(/\{[\s\S]*\}/);if(d){let c=JSON.parse(d[0]);return console.log("[Image Prompter] Generated series summary:",c),c}throw new Error("No JSON found in summary response")}catch(a){return console.warn("[Image Prompter] Failed to generate series summary:",a),null}}var Z={auto:"Derive the visual style from the website context, industry, and surrounding content",photorealistic:"Professional photography, natural lighting, high detail, realistic textures, sharp focus",illustration:"Digital illustration, clean vector-like lines, vibrant colors, modern flat design",minimal:"Minimalist composition, clean backgrounds, simple shapes, lots of whitespace, subtle colors",corporate:"Professional business imagery, clean and polished, trustworthy feel, neutral backgrounds",artistic:"Creative and unique perspective, artistic interpretation, expressive, memorable",lifestyle:"Lifestyle photography, candid authentic feel, warm tones, relatable scenarios",tech:"Modern technology aesthetic, sleek devices, blue/purple tones, futuristic feel",nature:"Natural landscapes, organic textures, earthy colors, environmental themes"},ee={"fal-ai/flux-2":{sizes:["square_hd","square","landscape_16_9","landscape_4_3","portrait_4_3","portrait_16_9"],format:"preset",default:"landscape_16_9"},"fal-ai/flux-2-pro":{sizes:["square_hd","square","landscape_16_9","landscape_4_3","portrait_4_3","portrait_16_9"],format:"preset",default:"landscape_16_9"},"fal-ai/flux/dev":{sizes:["square_hd","square","landscape_16_9","landscape_4_3","portrait_4_3","portrait_16_9"],format:"preset",default:"landscape_16_9"},"fal-ai/flux/schnell":{sizes:["square_hd","square","landscape_16_9","landscape_4_3","portrait_4_3","portrait_16_9"],format:"preset",default:"landscape_16_9"},"fal-ai/flux-pro":{sizes:["square_hd","square","landscape_16_9","landscape_4_3","portrait_4_3","portrait_16_9"],format:"preset",default:"landscape_16_9"},"fal-ai/nano-banana-pro":{sizes:["square_hd","square","landscape_16_9","landscape_4_3","portrait_4_3","portrait_16_9"],format:"preset",default:"landscape_16_9"},"fal-ai/nano-banana":{sizes:["square_hd","square","landscape_16_9","landscape_4_3","portrait_4_3","portrait_16_9"],format:"preset",default:"landscape_16_9"},"fal-ai/ideogram/v3":{sizes:["1:1","16:9","9:16","4:3","3:4","3:2","2:3"],format:"ratio",default:"16:9"},"fal-ai/gpt-image-1/text-to-image":{sizes:["1024x1024","1792x1024","1024x1792"],format:"dimensions",default:"1792x1024"},"fal-ai/gpt-image-1-mini":{sizes:["1024x1024","1792x1024","1024x1792"],format:"dimensions",default:"1792x1024"},"fal-ai/gemini-3-pro-image-preview":{sizes:["square_hd","landscape_16_9","portrait_16_9"],format:"preset",default:"landscape_16_9"},"fal-ai/bytedance/seedream/v4/text-to-image":{sizes:["1:1","16:9","9:16","4:3","3:4"],format:"ratio",default:"16:9"},"fal-ai/fast-sdxl":{sizes:["square_hd","square","landscape_16_9","landscape_4_3","portrait_4_3","portrait_16_9"],format:"preset",default:"landscape_16_9"},"fal-ai/fast-lightning-sdxl":{sizes:["square_hd","square","landscape_16_9","landscape_4_3","portrait_4_3","portrait_16_9"],format:"preset",default:"landscape_16_9"},"fal-ai/realistic-vision":{sizes:["square_hd","square","landscape_16_9","landscape_4_3","portrait_4_3","portrait_16_9"],format:"preset",default:"landscape_16_9"},"fal-ai/animagine":{sizes:["square_hd","square","landscape_16_9","landscape_4_3","portrait_4_3","portrait_16_9"],format:"preset",default:"square_hd"}};function tt(e){if(!e)return null;let t=e.match(/placehold\.co\/(\d+)x(\d+)/i);if(t)return{width:parseInt(t[1]),height:parseInt(t[2])};let o=e.match(/via\.placeholder\.com\/(\d+)(?:x(\d+))?/i);if(o){let i=parseInt(o[1]),s=o[2]?parseInt(o[2]):i;return{width:i,height:s}}let r=e.match(/picsum\.photos\/(\d+)(?:\/(\d+))?/i);if(r){let i=parseInt(r[1]),s=r[2]?parseInt(r[2]):i;return{width:i,height:s}}let n=e.match(/dummyimage\.com\/(\d+)x(\d+)/i);if(n)return{width:parseInt(n[1]),height:parseInt(n[2])};let a=e.match(/placeholder\.com\/(\d+)x(\d+)/i);return a?{width:parseInt(a[1]),height:parseInt(a[2])}:null}function ot(e,t,o){let r=ee[o]||ee["fal-ai/flux-2"],n=e/t,a;if(n>=1.6?a="landscape_wide":n>=1.2?a="landscape":n>=.85?a="square":n>=.65?a="portrait":a="portrait_tall",r.format==="preset"){let s={landscape_wide:"landscape_16_9",landscape:"landscape_4_3",square:"square_hd",portrait:"portrait_4_3",portrait_tall:"portrait_16_9"}[a];return r.sizes.includes(s)?s:r.default}if(r.format==="ratio"){let s={landscape_wide:"16:9",landscape:"4:3",square:"1:1",portrait:"3:4",portrait_tall:"9:16"}[a];return r.sizes.includes(s)?s:r.default}return r.format==="dimensions"?a==="square"?"1024x1024":a.startsWith("landscape")?"1792x1024":"1024x1792":r.default}function Ut(e=[],t=[],o=null,r=null){let n="";if(r)n=`
## SERIES CONTEXT (CRITICAL - READ CAREFULLY)
You are generating image ${e.length+1} in a cohesive series. Here's the series analysis:

**Established Style:** ${r.dominant_style||"Not specified"}
**Color Palette:** ${Array.isArray(r.color_palette)?r.color_palette.join(", "):"Not specified"}
**Mood/Tone:** ${r.mood||"Not specified"}
**Technical Notes:** ${r.technical_notes||"None"}

**Subjects Already Covered:** ${Array.isArray(r.subjects_covered)?r.subjects_covered.join(", "):"None"}
**Avoid (Redundant):** ${Array.isArray(r.subjects_to_avoid)?r.subjects_to_avoid.join(", "):"None"}
**Suggested Fresh Angles:** ${Array.isArray(r.suggested_angles)?r.suggested_angles.join(", "):"Any complementary subject"}

REQUIREMENTS:
1. MATCH the established style, color palette, and mood exactly
2. Choose a subject from "Suggested Fresh Angles" or create something complementary
3. NEVER duplicate subjects from "Subjects Already Covered"
4. Maintain technical consistency (lighting, composition style)
5. The image should feel like part of a professional photo series
`;else if(e.length>0){let i=e.map((s,l)=>`${l+1}. "${s.prompt.substring(0,80)}..." (for: ${s.context})`).join(`
`);n=`
## DIVERSIFICATION RULES (CRITICAL - READ CAREFULLY)
You are generating image ${e.length+1} in a series. Previous prompts:
${i}

REQUIREMENTS:
1. MAINTAIN the same visual style, color palette, lighting, and overall mood
2. VARY the specific subject, composition, angle, or scene
3. Create a COMPLEMENTARY image that works as part of a cohesive set
4. NEVER repeat the exact same subject or composition
5. Think of it as creating a professional photo series, not duplicates
6. Each image should be UNIQUE but feel like it belongs to the same "family"

Good diversification examples:
- Previous: "Modern office with plants" \u2192 New: "Coffee meeting in bright workspace with similar lighting"
- Previous: "Team collaboration around table" \u2192 New: "Individual focused work at minimalist desk"
- Previous: "Abstract blue flowing waves" \u2192 New: "Abstract blue geometric crystal patterns"
`}let a="";return t.length>0&&o?a=`
## IMAGE SIZE SELECTION (MANDATORY)
Available sizes for this model: ${JSON.stringify(t)}
Original placeholder dimensions: ${o.width}x${o.height} (ratio: ${(o.width/o.height).toFixed(2)})

You MUST select the "image_size" field from the available options above.
Choose the option that BEST MATCHES the original placeholder aspect ratio.
Return the EXACT value from the list, not a generic ratio like "16:9".
`:t.length>0&&(a=`
## IMAGE SIZE SELECTION
Available sizes for this model: ${JSON.stringify(t)}
Select the most appropriate size based on the image context (hero = landscape, avatar = square, etc.)
Return the EXACT value from the list above.
`),`You are an expert AI image prompt engineer specializing in creating detailed, effective prompts for AI image generation (Flux, DALL-E, Midjourney style).

Your task: Analyze the context and generate a perfect, UNIQUE image prompt.

## OUTPUT FORMAT (JSON only, no markdown, no explanation)
{
  "prompt": "detailed image generation prompt (50-150 words)",
  "negative_prompt": "what to avoid (comma-separated)",
  "image_size": "exact size from available options",
  "alt_text": "concise alt text for accessibility (under 125 chars)"
}
${n}
## PROMPT WRITING RULES
1. Start with the main subject, then add details
2. Include: lighting, composition, style, mood, colors
3. Be specific: "modern glass office building with floor-to-ceiling windows" not "building"
4. Match the website's industry and tone
5. Consider the section context (hero = impactful, features = illustrative, testimonials = portraits)
6. NEVER include text/words/letters in the image prompt (AI struggles with text rendering)
7. Add quality boosters: "professional photography", "8k resolution", "highly detailed"
8. For people: specify diversity, professional attire, natural expressions
${a}
## NEGATIVE PROMPT ESSENTIALS
Always include: "blurry, low quality, distorted, watermark, text, words, letters, logos"
Add context-specific negatives based on the image type.

Return ONLY valid JSON. No markdown code blocks. No explanations.`}async function ue(e){let{placeholder:t,surroundingHtml:o="",websiteInfo:r="",style:n="auto",helperModel:a="anthropic/claude-haiku-4.5",imageModel:i="fal-ai/flux-2-pro",defaultSize:s="auto",previousPrompts:l=[],seriesSummary:d=null,imageIndex:c=0,totalImages:p=1}=e,u=t.aiPrompt||"",h=t.alt||"",g=Z[n]||Z.auto,m=tt(t.src),y=ee[i]||ee["fal-ai/flux-2"],S=y.sizes,w;s&&s!=="auto"&&y.sizes.includes(s)?w=s:m?w=ot(m.width,m.height,i):w=y.default;let P=Ut(l,S,m,d),D=`Generate an image prompt for this context:

## WEBSITE CONTEXT
${r||"No website info provided - infer from HTML context"}

## IMAGE STYLE
${n}: ${g}

## IMAGE POSITION
Image ${c+1} of ${p} on the page

## SURROUNDING HTML CONTEXT
\`\`\`html
${o.substring(0,2500)}
\`\`\`

## EXISTING HINTS
- Alt text: ${h||"none"}
- AI prompt hint: ${u||"none"}
- Original placeholder: ${t.src||"unknown"}
${m?`- Original dimensions: ${m.width}x${m.height}`:""}

## SUGGESTED SIZE
Based on placeholder dimensions, recommended size: "${w}"

Generate the optimal image prompt. Return ONLY valid JSON.`;try{let U=(await I(a,[{role:"system",content:P},{role:"user",content:D}],{temperature:.4,max_tokens:600})).choices?.[0]?.message?.content||"",E;try{let L=U,ne=U.match(/```(?:json)?\s*([\s\S]*?)```/);ne&&(L=ne[1].trim());let ae=L.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/);if(ae)E=JSON.parse(ae[0]);else{let ie=L.match(/\{[\s\S]*\}/);if(ie)E=JSON.parse(ie[0]);else throw new Error("No JSON found in response")}}catch(L){console.warn("[Image Prompter] Failed to parse JSON, using fallback:",L),console.warn("[Image Prompter] Raw response:",U),console.warn("[Image Prompter] This is likely a model response issue, not a code issue."),E={prompt:u||`Professional ${n} image related to ${h||"business content"}, high quality, detailed, 8k resolution`,negative_prompt:"blurry, low quality, distorted, watermark, text, words, letters, logos",image_size:w,alt_text:h||"AI generated image"}}let k=E.image_size||w;return S.includes(k)||(console.warn(`[Image Prompter] Invalid size "${k}", using suggested: ${w}`),k=w),{prompt:E.prompt||"Professional business image, high quality, detailed",negative_prompt:E.negative_prompt||"blurry, low quality, distorted, watermark, text, words, letters",image_size:k,alt_text:E.alt_text||h||"AI generated image",aspect_ratio:et(k)}}catch(W){return console.error("[Image Prompter] Error:",W),{prompt:u||`Professional ${n} image, high quality, detailed, 8k resolution`,negative_prompt:"blurry, low quality, distorted, watermark, text, words, letters, logos",image_size:w,alt_text:h||"AI generated image",aspect_ratio:et(w)}}}function et(e){if(e.includes(":"))return e;let t={landscape_16_9:"16:9",landscape_4_3:"4:3",square_hd:"1:1",square:"1:1",portrait_4_3:"3:4",portrait_16_9:"9:16"};if(t[e])return t[e];let o=e.match(/(\d+)x(\d+)/);if(o){let r=parseInt(o[1]),n=parseInt(o[2]),a=r/n;return a>1.5?"16:9":a>1.2?"4:3":a>.85?"1:1":a>.65?"3:4":"9:16"}return"16:9"}function rt(e,t,o=500){let r=Math.max(0,t-o),n=Math.min(e.length,t+o);return e.substring(r,n)}function Gt(e){let t=[],o=[/https?:\/\/placehold\.co[^"'\s]*/gi,/https?:\/\/via\.placeholder\.com[^"'\s]*/gi,/https?:\/\/placeholder\.com[^"'\s]*/gi,/https?:\/\/placekitten\.com[^"'\s]*/gi,/https?:\/\/picsum\.photos[^"'\s]*/gi,/https?:\/\/dummyimage\.com[^"'\s]*/gi],r=/<img[^>]*>/gi,n;for(;(n=r.exec(e))!==null;){let i=n[0],s=n.index,l=i.match(/src=["']([^"']+)["']/i);if(!l)continue;let d=l[1],c=!1;for(let u of o)if(u.lastIndex=0,u.test(d)){c=!0;break}let p=i.match(/data-ai-prompt=["']([^"']+)["']/i);if(p&&(c=!0),c){let u=i.match(/alt=["']([^"']+)["']/i);t.push({src:d,index:s,element:i,alt:u?u[1]:"",aiPrompt:p?p[1]:""})}}let a=/background(?:-image)?:\s*url\(["']?([^"')]+)["']?\)/gi;for(;(n=a.exec(e))!==null;){let i=n[1],s=!1;for(let l of o)if(l.lastIndex=0,l.test(i)){s=!0;break}s&&t.push({src:i,index:n.index,element:n[0],alt:"",aiPrompt:"",isBackground:!0})}return t}function Dt(e,t,o=800){let r=Math.max(0,t-o),n=Math.min(e.length,t+o);return e.substring(r,n)}async function ve(e){let t=e.sections[e.currentSectionIndex];if(!t)return{currentStep:"error",error:"No section to process"};if(e.imageSource==="placeholder"||e.imageSource==="none"){let g=e.generatedSections[t.id];return{currentStep:"imaging",progress:{...e.progress,completed:(e.progress?.completed||0)+1,message:`Keeping placeholder images for ${t.label}`},generatedSections:g?{[t.id]:{...g,imagePrompts:[],status:"completed"}}:void 0}}let o=e.generatedSections[t.id];if(!o||o.status==="error"||!o.code)return{currentStep:"imaging",progress:{...e.progress,completed:e.progress.completed+1,message:`Skipping image prompts for ${t.label}`}};let r=Gt(o.code);if(r.length===0)return{currentStep:"imaging",progress:{...e.progress,completed:e.progress.completed+1,message:`No placeholder images in ${t.label}`},generatedSections:{[t.id]:{...o,imagePrompts:[],status:"completed"}}};let n={...e.progress,message:`Generating ${r.length} image prompt(s) for ${t.label}...`};console.log(`[Imager] Found ${r.length} placeholders in section: ${t.id}`);let a=e.imageModel||"fal-ai/flux-2-pro",i=e.imageSize||"auto",s=e.imageStyle||"auto",l=e.helperModel||"anthropic/claude-haiku-4.5",d=e.websiteInfo||"";console.log(`[Imager] Config - model: ${a}, defaultSize: ${i}, style: ${s}`);let c=e.previousImagePrompts||[],p=e.promptSeriesSummary||null,u=[],h=[...c];for(let g=0;g<r.length;g++){let m=r[g];try{if(console.log(`[Imager] Generating prompt ${g+1}/${r.length} for:`,m.src),h.length>=2&&(g===0||g%2===0))try{let w=await pe(h.slice(-5),l);w&&(p=w,console.log(`[Imager] Updated series summary at prompt ${g+1}`))}catch(w){console.warn("[Imager] Failed to generate series summary, using fallback:",w)}let y=Dt(o.code,m.index,1e3),S=await ue({placeholder:m,surroundingHtml:y,websiteInfo:d,style:s,helperModel:l,imageModel:a,defaultSize:i,previousPrompts:h.slice(-3),seriesSummary:p,imageIndex:g,totalImages:r.length});u.push({...S,placeholder_src:m.src,original_alt:m.alt,original_ai_prompt:m.aiPrompt,is_background:m.isBackground||!1}),h.push({prompt:S.prompt,context:m.alt||`image ${g+1}`}),console.log(`[Imager] Generated prompt ${g+1}:`,S.prompt.substring(0,80)+"...")}catch(y){console.error(`[Imager] Error generating prompt ${g+1}:`,y),u.push({prompt:m.aiPrompt||`Professional ${s} image, high quality, detailed`,negative_prompt:"blurry, low quality, distorted, watermark, text, words, letters",image_size:"landscape_16_9",alt_text:m.alt||"AI generated image",placeholder_src:m.src,original_alt:m.alt,is_background:m.isBackground||!1})}}return console.log(`[Imager] Generated ${u.length} prompts for section: ${t.id}`),{currentStep:"imaging",progress:{...n,completed:e.progress.completed+1,message:`Generated ${u.length} image prompt(s) for ${t.label}`},generatedSections:{[t.id]:{...o,imagePrompts:u,status:"prompts_ready"}},previousImagePrompts:h,promptSeriesSummary:p}}async function H(e){let{prompt:t,model:o="fal-ai/flux/dev",size:r="landscape_16_9",numImages:n=1,negativePrompt:a="",seed:i=null}=e,s=window.lc_editor_ai_image_url,l=window.lc_editor_rest_api_nonce;if(!s)throw new Error("Image generation endpoint not configured");if(!window.lc_editor_has_fal_key)throw new Error("fal.ai API key not configured. Please set it in LiveCanvas settings.");let d=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json","X-WP-Nonce":l},body:JSON.stringify({prompt:t,model:o,image_size:r,num_images:n,negative_prompt:a,seed:i})}),c=await d.json();if(!d.ok)throw new Error(c.message||"Image generation failed");return c}async function z(e,t={}){let o=window.lc_editor_ai_save_image_url,r=window.lc_editor_rest_api_nonce;if(!o)throw new Error("Image save endpoint not configured");let{filename:n=`ai-image-${Date.now()}.jpg`,alt:a="AI generated image",title:i="AI Generated Image"}=t,s=await fetch(o,{method:"POST",headers:{"Content-Type":"application/json","X-WP-Nonce":r},body:JSON.stringify({url:e,filename:n,alt:a,title:i})}),l=await s.json();if(!s.ok)throw new Error(l.message||"Failed to save image to media library");return l}async function te(e){let t=await H(e);if(!t.images||t.images.length===0)throw new Error("No images generated");let o=await Promise.all(t.images.map(async(r,n)=>{let a=`ai-${e.prompt.slice(0,30).replace(/[^a-z0-9]/gi,"-")}-${n+1}-${Date.now()}.jpg`,i=await z(r.url,{filename:a,alt:e.prompt,title:`AI: ${e.prompt.slice(0,50)}`});return{...r,wpUrl:i.url,attachmentId:i.attachment_id,thumbnail:i.thumbnail}}));return{...t,images:o}}var f={FLUX_2:{id:"fal-ai/flux-2",name:"Flux 2"},FLUX_2_PRO:{id:"fal-ai/flux-2-pro",name:"Flux 2 Pro"},FLUX_DEV:{id:"fal-ai/flux/dev",name:"Flux Dev"},FLUX_SCHNELL:{id:"fal-ai/flux/schnell",name:"Flux Schnell (Fast)"},FLUX_PRO:{id:"fal-ai/flux-pro",name:"Flux Pro"},NANO_BANANA_PRO:{id:"fal-ai/nano-banana-pro",name:"Nano Banana Pro"},NANO_BANANA:{id:"fal-ai/nano-banana",name:"Nano Banana"},GEMINI_3_PRO:{id:"fal-ai/gemini-3-pro-image-preview",name:"Gemini 3 Pro"},SEEDREAM_V4:{id:"fal-ai/bytedance/seedream/v4/text-to-image",name:"SeedReam V4"},GPT_IMAGE_1:{id:"fal-ai/gpt-image-1/text-to-image",name:"GPT Image 1"},GPT_IMAGE_1_MINI:{id:"fal-ai/gpt-image-1-mini",name:"GPT Image 1 Mini"},SDXL:{id:"fal-ai/fast-sdxl",name:"SDXL Fast"},SDXL_LIGHTNING:{id:"fal-ai/fast-lightning-sdxl",name:"SDXL Lightning"},REALISTIC:{id:"fal-ai/realistic-vision",name:"Realistic Vision"},ANIME:{id:"fal-ai/animagine",name:"Animagine (Anime)"}},A={FLUX_2_EDIT:{id:"fal-ai/flux-2/edit",name:"Flux 2 Edit"},FLUX_2_PRO_EDIT:{id:"fal-ai/flux-2-pro/edit",name:"Flux 2 Pro Edit"},IDEOGRAM_V3_EDIT:{id:"fal-ai/ideogram/v3/edit",name:"Ideogram V3 Edit"},NANO_BANANA_PRO_EDIT:{id:"fal-ai/nano-banana-pro/edit",name:"Nano Banana Pro Edit"},NANO_BANANA_EDIT:{id:"fal-ai/nano-banana/edit",name:"Nano Banana Edit"},GEMINI_3_PRO_EDIT:{id:"fal-ai/gemini-3-pro-image-preview/edit",name:"Gemini 3 Pro Edit"}},N={SORA_2:{id:"fal-ai/sora-2/text-to-video",name:"Sora 2"},SORA_2_PRO:{id:"fal-ai/sora-2/text-to-video/pro",name:"Sora 2 Pro"},VEO_3_1:{id:"fal-ai/veo3.1/text-to-video",name:"Veo 3.1"},VEO_3_1_FAST:{id:"fal-ai/veo3.1/fast/text-to-video",name:"Veo 3.1 Fast"},KLING_2_5_STANDARD:{id:"fal-ai/kling-video/v2.5-turbo/standard/text-to-video",name:"Kling 2.5 Standard"},KLING_2_5_PRO:{id:"fal-ai/kling-video/v2.5-turbo/pro/text-to-video",name:"Kling 2.5 Pro"}},T={SORA_2:{id:"fal-ai/sora-2/image-to-video",name:"Sora 2"},SORA_2_PRO:{id:"fal-ai/sora-2/image-to-video/pro",name:"Sora 2 Pro"},VEO_3_1:{id:"fal-ai/veo3.1/image-to-video",name:"Veo 3.1"},VEO_3_1_FAST:{id:"fal-ai/veo3.1/fast/image-to-video",name:"Veo 3.1 Fast"},VEO_3_1_REF:{id:"fal-ai/veo3.1/reference-to-video",name:"Veo 3.1 Reference"},KLING_2_5_STANDARD:{id:"fal-ai/kling-video/v2.5-turbo/standard/image-to-video",name:"Kling 2.5 Standard"},KLING_2_5_PRO:{id:"fal-ai/kling-video/v2.5-turbo/pro/image-to-video",name:"Kling 2.5 Pro"}},at={SQUARE_HD:"square_hd",SQUARE:"square",LANDSCAPE_16_9:"landscape_16_9",LANDSCAPE_4_3:"landscape_4_3",PORTRAIT_4_3:"portrait_4_3",PORTRAIT_16_9:"portrait_16_9"};function it(e){return typeof e=="string"?e:e?.id||e}function Te(e){let t=[],o=[/https?:\/\/placehold\.co[^"'\s]*/gi,/https?:\/\/via\.placeholder\.com[^"'\s]*/gi,/https?:\/\/placeholder\.com[^"'\s]*/gi,/https?:\/\/placekitten\.com[^"'\s]*/gi,/https?:\/\/picsum\.photos[^"'\s]*/gi,/https?:\/\/dummyimage\.com[^"'\s]*/gi],r=/<img[^>]*>/gi,n;for(;(n=r.exec(e))!==null;){let i=n[0],s=n.index,l=i.match(/src=["']([^"']+)["']/i);if(!l)continue;let d=l[1],c=!1;for(let u of o)if(u.lastIndex=0,u.test(d)){c=!0;break}let p=i.match(/data-ai-prompt=["']([^"']+)["']/i);if(p&&(c=!0),c){let u=i.match(/alt=["']([^"']+)["']/i);t.push({src:d,index:s,element:i,alt:u?u[1]:"",aiPrompt:p?p[1]:""})}}let a=/background(?:-image)?:\s*url\(["']?([^"')]+)["']?\)/gi;for(;(n=a.exec(e))!==null;){let i=n[1],s=!1;for(let l of o)if(l.lastIndex=0,l.test(i)){s=!0;break}s&&t.push({src:i,index:n.index,element:n[0],alt:"",aiPrompt:"",isBackground:!0})}return console.log(`[Image Generator] Found ${t.length} placeholder images`),t}function Ee(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function nt(e){if(!e)return"";if(e.includes("<head")||e.includes("<!DOCTYPE")||e.includes("<html")){let o=e.match(/<body[^>]*>([\s\S]*)<\/body>/i);if(o&&o[1])return console.log("[generateAllImages] Extracted body content from full document"),o[1]}return e}async function st(e){let{html:t,websiteInfo:o="",imageStyle:r="auto",model:n="fal-ai/flux-2-pro",helperModel:a="anthropic/claude-haiku-4.5",onProgress:i=()=>{}}=e,s=nt(t);if(console.log("[generateAllImages] Input HTML length:",t?.length,"-> Processed:",s?.length),console.log("[generateAllImages] Contains <head> after extraction?",s?.includes("<head")),!window.lc_editor_has_fal_key)throw new Error("fal.ai API key not configured. Please set it in LiveCanvas settings.");let l=Te(s);if(l.length===0)return{html:s,imagesGenerated:0,errors:[],message:"No placeholder images found"};let d=s,c=[],p=0,u=[],h=null;i({status:"scanning",total:l.length,current:0,message:`Found ${l.length} placeholder images`});for(let m=0;m<l.length;m++){let y=l[m];try{if(u.length>=2&&m%2===0)try{i({status:"analyzing",total:l.length,current:m+1,message:`Analyzing series style for image ${m+1}...`});let E=await pe(u.slice(-5),a);E&&(h=E,console.log(`[Batch Image] Updated series summary at image ${m+1}`))}catch(E){console.warn("[Batch Image] Failed to generate series summary, using fallback:",E)}i({status:"prompting",total:l.length,current:m+1,message:`Creating prompt for image ${m+1}/${l.length}...`});let S=rt(s,y.index,1e3),w=await ue({placeholder:y,surroundingHtml:S,websiteInfo:o,style:r,helperModel:a,imageModel:n,previousPrompts:u.slice(-3),seriesSummary:h,imageIndex:m,totalImages:l.length});console.log(`[Batch Image ${m+1}] Generated prompt:`,w.prompt.substring(0,100)+"..."),console.log(`[Batch Image ${m+1}] Size:`,w.image_size),u.push({prompt:w.prompt,context:y.alt||`image ${m+1}`}),i({status:"generating",total:l.length,current:m+1,message:`Generating image ${m+1}/${l.length}...`,prompt:w.prompt});let P=await H({prompt:w.prompt,negativePrompt:w.negative_prompt,model:n,size:w.image_size,numImages:1});if(!P.images||P.images.length===0)throw new Error("No image generated");let D=P.images[0].url;i({status:"saving",total:l.length,current:m+1,message:`Saving image ${m+1}/${l.length} to Media Library...`});let U=(await z(D,{filename:`ai-batch-${m+1}-${Date.now()}.jpg`,alt:w.alt_text,title:`AI: ${w.prompt.substring(0,50)}`})).url;if(y.isBackground){let E=new RegExp(`url\\(["']?${Ee(y.src)}["']?\\)`,"gi");d=d.replace(E,`url("${U}")`)}else{let E=new RegExp(`src=["']${Ee(y.src)}["']`,"gi");if(d=d.replace(E,`src="${U}"`),y.alt){let k=new RegExp(`alt=["']${Ee(y.alt)}["']`,"gi"),L=(w.alt_text||"").replace(/["']/g,"");d=d.replace(k,`alt="${L}"`)}d=d.replace(/\s*data-ai-prompt=["'][^"']*["']/gi,"")}p++,console.log(`[Batch Image ${m+1}] Successfully generated and replaced`)}catch(S){console.error(`[Batch Image ${m+1}] Error:`,S),c.push({index:m,placeholder:y.src,error:S.message}),i({status:"error",total:l.length,current:m+1,message:`Error on image ${m+1}: ${S.message}`})}}i({status:"complete",total:l.length,current:l.length,message:`Generated ${p} of ${l.length} images`,generated:p,errors:c.length});let g=nt(d);return console.log("[generateAllImages] Final HTML length:",g?.length),console.log("[generateAllImages] Final contains <head>?",g?.includes("<head")),(g?.includes("<head")||g?.includes("<!DOCTYPE"))&&console.error("[generateAllImages] CRITICAL: Output still contains document tags!"),{html:g,imagesGenerated:p,errors:c,total:l.length}}function Ae(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Ht(e,t,o,r){let n=e,a=t.placeholder_src||t.src||"";if(a){let i=new RegExp(`src=["']${Ae(a)}["']`,"i");n=n.replace(i,`src="${o}"`);let s=new RegExp(`url\\(["']?${Ae(a)}["']?\\)`,"i");n=n.replace(s,`url("${o}")`)}if(r&&t.original_alt){let i=new RegExp(`alt=["']${Ae(t.original_alt)}["']`,"gi");n=n.replace(i,`alt="${r}"`)}return n=n.replace(/\s*data-ai-prompt=["'][^"']*["']/gi,""),n}async function Pe(e){if(e.imageSource!=="ai_gen")return console.log("[ImageGenerator] Skipping - imageSource is not ai_gen"),{currentStep:"image_generation_complete"};let t=e.sections[e.currentSectionIndex];if(!t)return console.log("[ImageGenerator] No current section"),{currentStep:"image_generation_complete"};let o=e.generatedSections[t.id];if(!o||!o.imagePrompts||o.imagePrompts.length===0)return console.log("[ImageGenerator] No image prompts for section:",t.id),{currentStep:"image_generation_complete",generatedSections:{[t.id]:{...o,imagesGenerated:0}}};let r=o.imagePrompts,n=e.imageModel||"fal-ai/flux-2-pro",a=e.imageSize||"auto";console.log(`[ImageGenerator] Generating ${r.length} images for section: ${t.id}`),console.log(`[ImageGenerator] Using model: ${n}, default size: ${a}`);let i={...e.progress,message:`Generating ${r.length} AI image(s) for ${t.label}...`},s=o.code,l=0,d=[],c=[];for(let p=0;p<r.length;p++){let u=r[p];try{console.log(`[ImageGenerator] Generating image ${p+1}/${r.length}:`,u.prompt?.substring(0,50)+"...");let h=u.image_size||(a!=="auto"?a:"landscape_16_9"),g=await H({prompt:u.prompt,negativePrompt:u.negative_prompt||"blurry, low quality, distorted, watermark, text",model:n,size:h,numImages:1});if(!g.images||g.images.length===0)throw new Error("No image generated");let m=g.images[0].url,y=await z(m,{filename:`ai-section-${t.id}-${p+1}-${Date.now()}.jpg`,alt:u.alt_text||u.prompt?.substring(0,100)||"AI generated image",title:`AI: ${u.prompt?.substring(0,50)||"Generated Image"}`});s=Ht(s,u,y.url,u.alt_text),l++,d.push({prompt:u.prompt,url:y.url,attachmentId:y.attachment_id}),console.log(`[ImageGenerator] Image ${p+1} generated successfully:`,y.url)}catch(h){console.error(`[ImageGenerator] Error generating image ${p+1}:`,h),c.push({index:p,prompt:u.prompt?.substring(0,50),error:h.message})}}return console.log(`[ImageGenerator] Completed: ${l}/${r.length} images generated`),{currentStep:"image_generation_complete",progress:{...i,message:`Generated ${l} AI image(s) for ${t.label}`},generatedSections:{[t.id]:{...o,code:s,imagesGenerated:l,generatedImages:d,imageErrors:c.length>0?c:void 0}},previousImagePrompts:[...e.previousImagePrompts||[],...r.map(p=>({prompt:p.prompt,context:t.label||t.id}))]}}function lt(e){if(typeof document<"u"){let t=document.createElement("div");return t.innerHTML=e,t.textContent||t.innerText||""}return e.replace(/<script[^>]*>[\s\S]*?<\/script>/gi,"").replace(/<style[^>]*>[\s\S]*?<\/style>/gi,"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim()}function ct(e,t){let o={type:"general",subject:null,style:"professional",mood:"neutral",orientation:null},r=e.src.match(/(\d+)x(\d+)/);if(r){let c=parseInt(r[1]),p=parseInt(r[2]),u=c/p;u>1.3?o.orientation="landscape":u<.7?o.orientation="portrait":o.orientation="squarish"}let n=typeof e.alt=="string"?e.alt:"",a=typeof e.aiPrompt=="string"?e.aiPrompt:"",i=(n||a||"").toLowerCase();i.includes("hero")||i.includes("banner")||i.includes("header")?o.type="hero":i.includes("team")||i.includes("people")||i.includes("person")?o.type="people":i.includes("product")||i.includes("item")?o.type="product":i.includes("icon")||i.includes("logo")?o.type="icon":(i.includes("background")||e.isBackground)&&(o.type="background");let s=i.split(/[\s,]+/).filter(c=>c.length>3&&!["image","photo","picture","img","the","and","for","with"].includes(c));s.length>0&&(o.subject=s.slice(0,3).join(" "));let l=lt(t).toLowerCase(),d={tech:["software","technology","digital","app","code","computer"],business:["office","meeting","corporate","professional","business"],health:["medical","health","doctor","hospital","wellness"],education:["school","education","learning","student","teacher"],food:["restaurant","food","cooking","chef","meal"],travel:["travel","vacation","hotel","beach","destination"]};for(let[c,p]of Object.entries(d))if(p.some(u=>l.includes(u))){o.industry=c;break}return o}async function zt(e,t="anthropic/claude-haiku-4.5"){let{sectionGoal:o,html:r,websiteInfo:n,placeholder:a}=e,i=ct(a,r),s=lt(r).substring(0,500),l=`You are an expert at creating precise search queries for Unsplash stock photos.

## SECTION CONTEXT
Goal: ${o||"N/A"}
Website/Business: ${n||"N/A"}

## IMAGE PLACEHOLDER ANALYSIS
Type: ${i.type}
Subject hints: ${i.subject||"N/A"}
Orientation: ${i.orientation||"auto"}
Alt text: ${a.alt||"N/A"}
AI Prompt: ${a.aiPrompt||"N/A"}
${i.industry?`Industry: ${i.industry}`:""}

## SURROUNDING CONTENT
${s||"N/A"}

## YOUR TASK
Generate a precise, effective search query (2-5 keywords) for Unsplash that will find the PERFECT stock photo for this specific placeholder.

CRITICAL REQUIREMENTS:
1. The query MUST match what the image should actually show based on:
   - The section's goal and purpose
   - The surrounding text content
   - The placeholder's alt text or AI prompt
   - The website's business/industry context

2. Use SPECIFIC, SEARCHABLE keywords:
   - Good: "modern office team collaboration", "healthy breakfast food", "tech startup workspace"
   - Bad: "image", "photo", "picture", generic terms

3. Consider the image type:
   - Hero images: wide, impactful scenes
   - People images: specific demographics, activities, emotions
   - Product images: specific product types, settings
   - Background images: abstract, patterns, textures

4. Match the industry/business context when relevant

## OUTPUT FORMAT
Return ONLY the search query words, separated by spaces or commas. No quotes, no explanations.
Example outputs:
- "modern office workspace team"
- "healthy breakfast food photography"
- "professional business meeting"
- "tech startup office collaboration"

Search query:`;try{let c=(await I({provider:"openrouter",model:t,messages:[{role:"system",content:"You are an expert search query generator for stock photos. You create precise, effective queries that return highly relevant results."},{role:"user",content:l}],temperature:.6,max_tokens:60})).choices[0].message.content.trim();return c=c.replace(/^["']|["']$/g,"").replace(/^(search query|query|keywords?):\s*/i,"").replace(/[^\w\s,]/g," ").replace(/\s+/g," ").trim(),(!c||c.length<3||c.toLowerCase().includes("image")||c.toLowerCase().includes("photo"))&&(c=i.subject||a.alt||a.aiPrompt||"professional business"),console.log(`[UnsplashSearcher] Generated query: "${c}" (from analysis: ${i.type})`),c}catch(d){console.error("[UnsplashSearcher] Error generating query:",d);let c=typeof a.alt=="string"?a.alt:"",p=typeof a.aiPrompt=="string"?a.aiPrompt:"",u=i.subject||c||p||"professional business";return console.log(`[UnsplashSearcher] Using fallback query: "${u}"`),String(u)}}async function Ft(e,t={}){let{page:o=1,per_page:r=10,orientation:n=null}=t,a=typeof window<"u"&&window.lc_editor_unsplash_access_key?String(window.lc_editor_unsplash_access_key).trim():"";if(!a)return console.warn("[UnsplashSearcher] Unsplash disabled: missing lc_editor_unsplash_access_key"),{total:0,total_pages:0,results:[]};let i=new URLSearchParams({client_id:a,query:e,page:o.toString(),per_page:r.toString()});n&&i.append("orientation",n);let s=`https://api.unsplash.com/search/photos?${i.toString()}`;try{let l=await fetch(s,{method:"GET",headers:{"Accept-Version":"v1"}});if(!l.ok)throw new Error(`Unsplash API error: ${l.status}`);let d=await l.json();return{total:d.total||0,total_pages:d.total_pages||0,results:(d.results||[]).map(c=>({id:c.id,urls:{raw:c.urls?.raw||"",full:c.urls?.full||"",regular:c.urls?.regular||"",small:c.urls?.small||"",thumb:c.urls?.thumb||""},width:c.width||0,height:c.height||0,description:c.description||c.alt_description||"",alt_description:c.alt_description||"",user:{name:c.user?.name||"",username:c.user?.username||"",links:{html:c.user?.links?.html||""}},links:{html:c.links?.html||"",download:c.links?.download||""}}))}}catch(l){throw console.error("[UnsplashSearcher] API call failed:",l),l}}function Bt(e,t,o){let r=0,n=(e.description||e.alt_description||"").toLowerCase(),i=(t.searchQuery?.toLowerCase()||"").split(/\s+/).filter(d=>d.length>2),s=i.filter(d=>n.includes(d));if(r+=s.length/i.length*40,o.orientation){let d=e.width/e.height,c="squarish";d>1.3?c="landscape":d<.7&&(c="portrait"),c===o.orientation&&(r+=20)}n.length>20&&(r+=10);let l=e.width*e.height;return l>2e6?r+=10:l>1e6&&(r+=5),o.industry&&t.websiteInfo&&({tech:["technology","digital","computer","software","tech"],business:["business","office","corporate","professional","meeting"],health:["health","medical","wellness","doctor","hospital"],education:["education","school","learning","student","teacher"],food:["food","restaurant","cooking","chef","meal"],travel:["travel","vacation","hotel","beach","destination"]}[o.industry]||[]).some(p=>n.includes(p))&&(r+=20),r}function jt(e,t,o){if(!e||e.length===0)return null;if(e.length===1){let a=e[0];return{id:a.id,url:a.urls.full||a.urls.regular,regular:a.urls.regular,thumb:a.urls.thumb,small:a.urls.small,full:a.urls.full,description:a.description||a.alt_description||"",photographer:a.user.name||"",photographerUrl:a.user.links?.html||"",width:a.width,height:a.height}}let r=e.map(a=>({image:a,score:Bt(a,t,o)}));r.sort((a,i)=>i.score-a.score);let n=r[0].image;return console.log(`[UnsplashSearcher] Selected image with score ${r[0].score} (from ${e.length} results)`),{id:n.id,url:n.urls.full||n.urls.regular,regular:n.urls.regular,thumb:n.urls.thumb,small:n.urls.small,full:n.urls.full,description:n.description||n.alt_description||"",photographer:n.user.name||"",photographerUrl:n.user.links?.html||"",width:n.width,height:n.height}}function qt(e,t,o){if(!o||!o.regular)return e;let r=t.src,n=o.regular,a=new RegExp(`src=["']${oe(r)}["']`,"gi"),i=e.replace(a,`src="${n}"`),s=new RegExp(`url\\(["']?${oe(r)}["']?\\)`,"gi");if(i=i.replace(s,`url("${n}")`),o.description){let l=o.description.substring(0,100);if(t.alt){let d=new RegExp(`alt=["']${oe(t.alt)}["']`,"gi");i=i.replace(d,`alt="${l}"`)}else{let d=new RegExp(`(<img[^>]*src=["']${oe(n)}["'][^>]*)>`,"gi");i=i.replace(d,`$1 alt="${l}">`)}}if(o.photographer){let l=new RegExp(`(<img[^>]*src=["']${oe(n)}["'][^>]*)>`,"gi");i=i.replace(l,(d,c)=>c.includes("data-author-name")?d:`${c} data-author-name="${o.photographer}">`)}return i=i.replace(/\s*data-ai-prompt=["'][^"']*["']/gi,""),i}function oe(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Yt(e){let t=[],o=[/https?:\/\/placehold\.co[^"'\s]*/gi,/https?:\/\/via\.placeholder\.com[^"'\s]*/gi,/https?:\/\/placeholder\.com[^"'\s]*/gi,/https?:\/\/placekitten\.com[^"'\s]*/gi,/https?:\/\/picsum\.photos[^"'\s]*/gi,/https?:\/\/dummyimage\.com[^"'\s]*/gi,/https?:\/\/source\.unsplash\.com[^"'\s]*/gi],r=/<img[^>]*>/gi,n;for(;(n=r.exec(e))!==null;){let i=n[0],s=n.index,l=i.match(/src=["']([^"']+)["']/i);if(!l)continue;let d=l[1],c=!1;for(let p of o)if(p.lastIndex=0,p.test(d)){c=!0;break}if(c){let p=i.match(/alt=["']([^"']+)["']/i),u=i.match(/data-ai-prompt=["']([^"']+)["']/i);t.push({src:d,index:s,element:i,alt:p?p[1]:"",aiPrompt:u?u[1]:""})}}let a=/background(?:-image)?:\s*url\(["']?([^"')]+)["']?\)/gi;for(;(n=a.exec(e))!==null;){let i=n[1],s=!1;for(let l of o)if(l.lastIndex=0,l.test(i)){s=!0;break}s&&t.push({src:i,index:n.index,element:n[0],alt:"",aiPrompt:"",isBackground:!0})}return t}function Wt(e,t,o=800){let r=Math.max(0,t-o),n=Math.min(e.length,t+o);return e.substring(r,n)}function Kt(e,t){let o=e.src.match(/(\d+)x(\d+)/);if(o){let r=parseInt(o[1]),n=parseInt(o[2]),a=r/n;return a>1.3?"landscape":a<.7?"portrait":"squarish"}return e.isBackground?"landscape":null}async function Ne(e){if(e.imageSource!=="unsplash")return console.log("[UnsplashSearcher] Skipping - imageSource is not unsplash"),{currentStep:"unsplash_search_complete"};let t=e.sections[e.currentSectionIndex];if(!t)return console.log("[UnsplashSearcher] No current section"),{currentStep:"unsplash_search_complete"};let o=e.generatedSections[t.id];if(!o||!o.code)return console.log("[UnsplashSearcher] No code for section:",t.id),{currentStep:"unsplash_search_complete"};let r=Yt(o.code);if(r.length===0)return console.log("[UnsplashSearcher] No placeholders found in section:",t.id),{currentStep:"unsplash_search_complete",generatedSections:{[t.id]:{...o,unsplashImages:[]}}};console.log(`[UnsplashSearcher] Found ${r.length} placeholders in section: ${t.id}`);let n={...e.progress,message:`Searching Unsplash for ${r.length} image(s) in ${t.label}...`},a=e.helperModel||"anthropic/claude-haiku-4.5",i=e.websiteInfo||"",s=o.code,l=[],d=[];for(let c=0;c<r.length;c++){let p=r[c];try{console.log(`[UnsplashSearcher] Processing placeholder ${c+1}/${r.length}`);let u=Wt(o.code,p.index,1e3),h=ct(p,u),g=await zt({sectionGoal:t.goal,html:u,websiteInfo:i,placeholder:p},a);console.log(`[UnsplashSearcher] Generated query: "${g}" (type: ${h.type}, orientation: ${h.orientation||"auto"})`);let m=h.orientation||Kt(p,o.code),y=await Ft(g,{per_page:10,orientation:m||void 0});if(!y.results||y.results.length===0){console.warn(`[UnsplashSearcher] No results for query: "${g}"`),d.push({placeholder:c,query:g,error:"No results found"});continue}let S=jt(y.results,{sectionGoal:t.goal,html:u,websiteInfo:i,searchQuery:g},h);if(!S){console.warn("[UnsplashSearcher] Could not select image from results"),d.push({placeholder:c,query:g,error:"Could not select image"});continue}s=qt(s,p,S),l.push({query:g,image:S,placeholderIndex:c}),console.log(`[UnsplashSearcher] Replaced placeholder ${c+1} with Unsplash image: ${S.regular||S.url}`)}catch(u){console.error(`[UnsplashSearcher] Error processing placeholder ${c+1}:`,u),d.push({placeholder:c,error:u.message})}}return console.log(`[UnsplashSearcher] Completed: ${l.length}/${r.length} images found`),{currentStep:"unsplash_search_complete",progress:{...n,completed:e.progress.completed+1,message:`Found ${l.length} Unsplash image(s) for ${t.label}`},generatedSections:{[t.id]:{...o,code:s,unsplashImages:l,unsplashErrors:d.length>0?d:void 0}}}}async function Oe(e){let t=e.progress||{completed:0,total:1,message:""},o={...t,message:"Assembling final output..."};try{let r=e.sections||[],n=e.generatedSections||{},a=r.map(s=>n[s.id]).filter(s=>s&&s.code);return a.length===0?{currentStep:"error",error:"No sections were successfully generated",progress:{...o,message:"Error: No content generated"}}:e.mode==="edit"||e.mode==="screenshot-to-code"?{currentStep:"completed",finalHtml:a[0].code,progress:{completed:t.total,total:t.total,message:"Generation complete!"}}:{currentStep:"completed",finalHtml:a.map(s=>s.code).join(`

`),progress:{completed:t.total,total:t.total,message:`Generation complete! Created ${a.length} section(s).`}}}catch(r){return console.error("Assembler error:",r),{currentStep:"error",error:r.message,progress:{...o,message:`Assembly error: ${r.message}`}}}}async function dt(e){let t=e.progress||{completed:0,total:1,message:""},o={...t,message:"Injecting rewritten content..."};try{if(!e.currentHtml)throw new Error("No original HTML to inject into.");if(typeof DOMParser>"u")throw new Error("DOMParser not available. This feature requires a browser environment.");let n=new DOMParser().parseFromString(e.currentHtml,"text/html"),a=n.querySelector("parsererror");a&&console.warn("HTML parsing had errors, proceeding anyway:",a.textContent);let i=0,s=e.sections||[],l=e.generatedSections||{};for(let c of s){let p=l[c.id];if(!p||!p.code||p.status!=="completed"){console.log(`Skipping section ${c.id}: no valid generated content`);continue}let u=c.selector||p.selector;if(!u){console.warn(`Section ${c.id} has no selector, skipping`);continue}try{let h=n.querySelector(u);if(h){let g=n.createElement("div");g.innerHTML=p.code.trim();let m=g.firstElementChild;m?(h.replaceWith(m),i++,console.log(`Injected section ${c.id} at selector: ${u}`)):(h.outerHTML=p.code,i++,console.log(`Injected section ${c.id} via outerHTML at: ${u}`))}else console.warn(`Could not find element for selector: ${u}`)}catch(h){console.error(`Error processing selector "${u}":`,h)}}let d;return e.currentHtml.includes("<html")||e.currentHtml.includes("<!DOCTYPE"),d=n.body.innerHTML,{currentStep:"completed",finalHtml:d,progress:{completed:t.total,total:t.total,message:`Rewriting complete! Updated ${i} section(s).`}}}catch(r){return console.error("Injector error:",r),{currentStep:"error",error:r.message,finalHtml:e.currentHtml,progress:{...o,message:`Injection error: ${r.message}`}}}}function Me(e){return{currentSectionIndex:(e.currentSectionIndex||0)+1}}async function pt(e){let t=await Xe(e),o={...e,...t,generatedSections:{...e.generatedSections,...t.generatedSections||{}}};if(e.mode!=="screenshot-to-code"){let r=await Qe(o);return{...t,...r,generatedSections:{...t.generatedSections,...r.generatedSections||{}}}}return t}function Vt(e){return e.error||e.currentSectionIndex>=e.sections.length?"assembler":"generator"}function Xt(e){return e.error||e.currentSectionIndex>=e.sections.length?"injector":"rewriteSection"}function Jt(e){return e.error||!e.sections||e.sections.length===0?R:"generator"}function Qt(e){return e.error||!e.sections||e.sections.length===0?R:"rewriteSection"}function Zt(e){return e.imageSource==="ai_gen"?"imageGenerator":e.imageSource==="unsplash"?"unsplashSearcher":"advanceSection"}function eo(){return new V().addNode("planner",Ie).addNode("generator",pt).addNode("imager",ve).addNode("imageGenerator",Pe).addNode("unsplashSearcher",Ne).addNode("advanceSection",Me).addNode("assembler",Oe).addEdge("__start__","planner").addConditionalEdges("planner",Jt,{generator:"generator",[R]:R}).addEdge("generator","imager").addConditionalEdges("imager",Zt,{imageGenerator:"imageGenerator",unsplashSearcher:"unsplashSearcher",advanceSection:"advanceSection"}).addEdge("imageGenerator","advanceSection").addEdge("unsplashSearcher","advanceSection").addConditionalEdges("advanceSection",Vt,{generator:"generator",assembler:"assembler"}).addEdge("assembler",R).compile()}function to(){return new V().addNode("narrativePlanner",je).addNode("rewriteSection",Ze).addNode("advanceSection",Me).addNode("injector",dt).addEdge("__start__","narrativePlanner").addConditionalEdges("narrativePlanner",Qt,{rewriteSection:"rewriteSection",[R]:R}).addEdge("rewriteSection","advanceSection").addConditionalEdges("advanceSection",Xt,{rewriteSection:"rewriteSection",injector:"injector"}).addEdge("injector",R).compile()}var O={STATE_UPDATE:"state_update",NODE_START:"node_start",NODE_END:"node_end",ERROR:"error",COMPLETE:"complete"};async function F(e,t=()=>{}){let o=eo(),r=se(e),n=xe("AI Graph Execution",{userPrompt:e.userPrompt,selectedModel:e.selectedModel,mode:r.mode,hasHtml:!!e.currentHtml});t({type:O.STATE_UPDATE,state:r});try{let a=r;for await(let i of o.stream(r)){let[s,l]=Object.entries(i)[0]||[];s&&l&&($(s,"end",l),a={...a,...l,generatedSections:{...a.generatedSections,...l.generatedSections||{}}},t({type:O.NODE_END,node:s,state:a}))}return t({type:O.COMPLETE,state:a}),J({sectionsGenerated:Object.keys(a.generatedSections||{}).length,finalHtmlLength:a.finalHtml?.length||0}),a}catch(a){throw console.error("Graph execution error:",a),J(null,a),t({type:O.ERROR,error:a.message}),a}}async function ut(e,t=()=>{}){let o=to(),r=se(e);xe("Storytelling Graph Execution",{userPrompt:e.userPrompt,selectedModel:e.selectedModel,preset:e.storytellingPreset}),t({type:O.STATE_UPDATE,state:r});try{let n=r;for await(let a of o.stream(r)){let[i,s]=Object.entries(a)[0]||[];i&&s&&($(i,"end",s),n={...n,...s,generatedSections:{...n.generatedSections,...s.generatedSections||{}}},t({type:O.NODE_END,node:i,state:n}))}return t({type:O.COMPLETE,state:n}),J({sectionsRewritten:Object.keys(n.generatedSections||{}).length}),n}catch(n){throw console.error("Storytelling Graph error:",n),J(null,n),t({type:O.ERROR,error:n.message}),n}}async function mt(e){let t=await F(e);if(t.error)throw new Error(t.error);return t.finalHtml}async function gt(e,t=()=>{}){let o=se(e),r=await Ie(o),n=r.sections||[];if(n.length===0)throw new Error("No sections identified for generation");t({type:O.STATE_UPDATE,state:{...o,...r}});let a=[],i=await Promise.all(n.map(async(p,u)=>{let h={...o,...r,currentSectionIndex:u,previousImagePrompts:a};try{let g=await pt(h),m={...h,...g,generatedSections:{...h.generatedSections,...g.generatedSections||{}}},y=await ve(m),S={...g.generatedSections?.[p.id],...y.generatedSections?.[p.id]};if(o.imageSource==="ai_gen"){let w={...m,...y,generatedSections:{...m.generatedSections,...y.generatedSections||{}}},P=await Pe(w);S={...S,...P.generatedSections?.[p.id]},P.previousImagePrompts&&(a=P.previousImagePrompts)}else if(o.imageSource==="unsplash"){let w={...m,...y,generatedSections:{...m.generatedSections,...y.generatedSections||{}}},P=await Ne(w);S={...S,...P.generatedSections?.[p.id]}}return{section:p,result:S}}catch(g){return console.error(`Error generating section ${p.id}:`,g),{section:p,result:{id:p.id,code:"",status:"error",error:g.message}}}})),s={};i.forEach(({section:p,result:u})=>{s[p.id]=u});let l={...o,...r,generatedSections:s,currentStep:"completed"},d=await Oe(l),c={...l,...d};return t({type:O.COMPLETE,state:c}),c}var he={generate:"/wp-json/livecanvas/v1/ai/fal/generate",status:"/wp-json/livecanvas/v1/ai/fal/status/",upload:"/wp-json/livecanvas/v1/ai/fal/upload",save:"/wp-json/livecanvas/v1/ai/media/save"};async function oo(e){if(typeof window.LiveCanvasAI>"u"||!window.LiveCanvasAI.improvePrompt)return console.warn("[Media Generator] LiveCanvasAI.improvePrompt not available"),e;let o=document.querySelector("select[name=ai_assistant__helper_model]")?.value||"anthropic/claude-haiku-4.5",r="";if(document.querySelector('input[name="ai-context-style"]')?.checked){let s=document.querySelector('textarea[name="ai_uikit_spec"]')?.value;s&&s.trim()&&(r=s.trim())}let a=e;return r&&(a=`${e}

[Style context: ${r}]`),await window.LiveCanvasAI.improvePrompt(a,o)}var B=null,re="image",C="text",M=null,me=!1,G=null,ge=null;function yt(e={}){let{onSelect:t,initialTab:o="image"}=e;if(ge=t,re=o,B){B.focus();return}B=new WinBox({id:"ai-media-generator",title:"\u2728 AI Media Generator",class:["no-full","my-theme"],html:ro(),background:"linear-gradient(135deg, #6366f1, #8b5cf6)",border:4,width:480,height:"85%",minheight:400,minwidth:380,x:"center",y:"center",onclose:()=>{ho(),B=null}}),setTimeout(()=>{no(),C="text",wt(re),bt("text")},50)}function $e(){B&&B.close()}function ro(){return`
        <div id="media-gen-container" style="padding: 15px 15px 20px; height: auto; overflow: visible; color: #fff; font-family: system-ui, -apple-system, sans-serif;">
            
            <!-- Tab Buttons -->
            <div id="media-gen-tabs" style="display: flex; gap: 8px; margin-bottom: 15px;">
                <button class="media-gen-tab active" data-tab="image" style="flex: 1; padding: 10px; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; background: rgba(255,255,255,0.2); color: #fff; transition: all 0.2s;">
                    \u{1F5BC}\uFE0F Image
                </button>
                <button class="media-gen-tab" data-tab="video" style="flex: 1; padding: 10px; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.7); transition: all 0.2s;">
                    \u{1F3AC} Video
                </button>
            </div>
            
            <!-- Source Type Selector (Text / Image) -->
            <div id="source-type-section" style="margin-bottom: 12px;">
                <label style="display: block; font-size: 12px; opacity: 0.8; margin-bottom: 4px;">Source</label>
                <div style="display: flex; gap: 6px;">
                    <button class="source-type-btn active" data-source="text" style="flex: 1; padding: 8px 12px; border: 1px solid rgba(255,255,255,0.3); border-radius: 6px; cursor: pointer; font-weight: 500; font-size: 13px; background: rgba(255,255,255,0.2); color: #fff; transition: all 0.2s;">
                        \u270F\uFE0F Text
                    </button>
                    <button class="source-type-btn" data-source="image" style="flex: 1; padding: 8px 12px; border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; cursor: pointer; font-weight: 500; font-size: 13px; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); transition: all 0.2s;">
                        \u{1F5BC}\uFE0F Image
                    </button>
                </div>
            </div>
            
            <!-- Model Selection -->
            <div style="margin-bottom: 8px;">
                <label style="display: block; font-size: 12px; opacity: 0.8; margin-bottom: 4px;">Model</label>
                <select id="media-gen-model" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.3); color: #fff; font-size: 14px;">
                    ${ke("image","text")}
                </select>
            </div>
            
            <!-- Size Selection (for images) -->
            <div id="size-section" style="margin-bottom: 12px;">
                <label style="display: block; font-size: 12px; opacity: 0.8; margin-bottom: 4px;">Size</label>
                <select id="media-gen-size" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.3); color: #fff; font-size: 14px;">
                    <option value="landscape_16_9">Landscape 16:9 (1920\xD71080)</option>
                    <option value="landscape_4_3">Landscape 4:3 (1536\xD71152)</option>
                    <option value="square_hd" selected>Square HD (1024\xD71024)</option>
                    <option value="square">Square (512\xD7512)</option>
                    <option value="portrait_4_3">Portrait 4:3 (1152\xD71536)</option>
                    <option value="portrait_16_9">Portrait 16:9 (1080\xD71920)</option>
                </select>
            </div>
            
            <!-- Image Upload Dropzone (visible when source = image) -->
            <div id="image-dropzone-section" style="margin-bottom: 12px; display: none;">
                <label style="display: block; font-size: 12px; opacity: 0.8; margin-bottom: 4px;">Source Image <span style="color: #fbbf24;">(required)</span></label>
                <div id="image-dropzone" style="width: 100%; min-height: 140px; border: 2px dashed rgba(255,255,255,0.3); border-radius: 8px; background: rgba(0,0,0,0.2); display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; padding: 20px; box-sizing: border-box;">
                    <div id="dropzone-content" style="text-align: center;">
                        <div style="font-size: 32px; margin-bottom: 8px; opacity: 0.6;">\u{1F4C1}</div>
                        <div style="font-size: 13px; font-weight: 500; margin-bottom: 4px;">Drop image here or click to upload</div>
                        <div style="font-size: 11px; opacity: 0.6;">Supports JPG, PNG, WebP</div>
                    </div>
                    <div id="dropzone-preview" style="display: none; width: 100%; height: 120px; background-size: contain; background-repeat: no-repeat; background-position: center; border-radius: 6px; position: relative;">
                        <button id="dropzone-clear-btn" style="position: absolute; top: -8px; right: -8px; width: 24px; height: 24px; border-radius: 50%; border: none; background: #ef4444; color: #fff; cursor: pointer; font-size: 14px; line-height: 1;">\xD7</button>
                    </div>
                </div>
                <input type="file" id="dropzone-file-input" accept="image/*" style="display: none;">
                <div style="display: flex; gap: 8px; margin-top: 8px;">
                    <button id="dropzone-url-btn" class="source-btn" style="flex: 1; padding: 6px 8px; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; background: rgba(0,0,0,0.2); color: rgba(255,255,255,0.8); cursor: pointer; font-size: 11px;">
                        \u{1F517} Paste URL
                    </button>
                    <button id="dropzone-media-btn" class="source-btn" style="flex: 1; padding: 6px 8px; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; background: rgba(0,0,0,0.2); color: rgba(255,255,255,0.8); cursor: pointer; font-size: 11px;">
                        \u{1F4F7} Media Library
                    </button>
                </div>
                <input type="text" id="dropzone-url-input" placeholder="Paste image URL and press Enter..." style="display: none; width: 100%; padding: 8px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.3); color: #fff; margin-top: 8px; font-size: 12px;">
                <input type="hidden" id="source-image-url" value="">
            </div>
            
            <!-- Prompt (visible when source = text) -->
            <div id="prompt-section" style="margin-bottom: 12px;">
                <label style="display: block; font-size: 12px; opacity: 0.8; margin-bottom: 4px;">Prompt</label>
                <textarea id="media-gen-prompt" placeholder="Describe the image or video you want to create..." style="width: 100%; min-height: 80px; padding: 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.3); color: #fff; font-size: 14px; resize: vertical;"></textarea>
                <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px;">
                    <input type="checkbox" id="media-gen-auto-improve" style="width: 16px; height: 16px; cursor: pointer;">
                    <label for="media-gen-auto-improve" style="font-size: 12px; cursor: pointer; opacity: 0.9;">
                        \u2728 Auto-improve prompt <span style="opacity: 0.6;">(uses AI to enhance before generation)</span>
                    </label>
                </div>
            </div>
            
            <!-- Optional Prompt for Image Source -->
            <div id="image-prompt-section" style="margin-bottom: 12px; display: none;">
                <label style="display: block; font-size: 12px; opacity: 0.8; margin-bottom: 4px;">Prompt <span style="opacity: 0.6;">(optional - describe changes)</span></label>
                <textarea id="media-gen-image-prompt" placeholder="Describe how to transform the image..." style="width: 100%; min-height: 60px; padding: 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.3); color: #fff; font-size: 14px; resize: vertical;"></textarea>
                <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px;">
                    <input type="checkbox" id="media-gen-auto-improve-image" style="width: 16px; height: 16px; cursor: pointer;">
                    <label for="media-gen-auto-improve-image" style="font-size: 12px; cursor: pointer; opacity: 0.9;">
                        \u2728 Auto-improve prompt
                    </label>
                </div>
            </div>
            
            <!-- Negative Prompt (for images) -->
            <div id="negative-section" style="margin-bottom: 15px;">
                <label style="display: block; font-size: 12px; opacity: 0.8; margin-bottom: 4px;">Negative Prompt <span style="opacity: 0.6;">(optional)</span></label>
                <input type="text" id="media-gen-negative" value="blurry, low quality, watermark, text" placeholder="What to avoid..." style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.3); color: #fff; font-size: 14px;">
            </div>
            
            <!-- Progress -->
            <div id="media-gen-progress" style="display: none; margin-bottom: 15px; padding: 12px; background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 6px;">
                <div style="text-align: center; margin-bottom: 8px;">
                    <span id="progress-text" style="font-size: 12px;">Generating...</span>
                </div>
                <div style="background: rgba(255,255,255,0.1); border-radius: 3px; height: 6px; overflow: hidden;">
                    <div id="progress-bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #22c55e, #4ade80); transition: width 0.3s ease;"></div>
                </div>
                <div id="progress-prompt-preview" style="margin-top: 8px; font-size: 10px; opacity: 0.6; display: none; max-height: 40px; overflow: hidden; text-overflow: ellipsis;"></div>
            </div>
            
            <!-- Generate Button -->
            <button id="media-gen-submit" style="width: 100%; padding: 14px; border: none; border-radius: 8px; background: linear-gradient(135deg, #22c55e, #16a34a); color: #fff; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 12px rgba(34,197,94,0.4);">
                \u2728 Generate
            </button>
            
            <!-- Result Preview -->
            <div id="media-gen-result" style="display: none; margin-top: 15px;">
                <label style="display: block; font-size: 12px; opacity: 0.8; margin-bottom: 8px;">Generated Media</label>
                <div id="result-preview" style="width: 100%; aspect-ratio: 16/9; background-size: contain; background-repeat: no-repeat; background-position: center; border-radius: 8px; border: 2px solid rgba(34,197,94,0.5); overflow: hidden;">
                    <video id="result-video" style="display: none; width: 100%; height: 100%; object-fit: contain;" controls></video>
                </div>
                <div style="display: flex; gap: 8px; margin-top: 10px;">
                    <button id="use-media-btn" style="flex: 1; padding: 12px; border: none; border-radius: 6px; background: #22c55e; color: #fff; font-weight: 600; cursor: pointer;">
                        \u2713 Use This Media
                    </button>
                    <button id="regenerate-btn" style="padding: 12px 16px; border: 1px solid rgba(255,255,255,0.3); border-radius: 6px; background: transparent; color: #fff; cursor: pointer;">
                        \u{1F504}
                    </button>
                </div>
            </div>
            
            <!-- Error Display -->
            <div id="media-gen-error" style="display: none; margin-top: 15px; padding: 12px; background: rgba(239,68,68,0.2); border: 1px solid #ef4444; border-radius: 6px; color: #fca5a5; font-size: 13px;"></div>
            
            <style>
                .media-gen-tab:hover { background: rgba(255,255,255,0.25) !important; }
                .media-gen-tab.active { background: rgba(255,255,255,0.3) !important; color: #fff !important; }
                .source-type-btn:hover { background: rgba(255,255,255,0.15) !important; border-color: rgba(255,255,255,0.4) !important; }
                .source-type-btn.active { background: rgba(255,255,255,0.2) !important; border-color: rgba(255,255,255,0.3) !important; color: #fff !important; }
                .source-btn:hover { background: rgba(255,255,255,0.1) !important; border-color: rgba(255,255,255,0.5) !important; }
                .source-btn.active { background: rgba(34,197,94,0.3) !important; border-color: #22c55e !important; }
                #image-dropzone:hover { border-color: rgba(255,255,255,0.5); background: rgba(0,0,0,0.3); }
                #image-dropzone.dragover { border-color: #22c55e; background: rgba(34,197,94,0.1); }
                #media-gen-submit:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(34,197,94,0.5); }
                #media-gen-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
                #use-media-btn:hover { background: #16a34a; }
            </style>
        </div>
    `}function ke(e,t="text"){let o="";return e==="image"?t==="text"?(o+='<optgroup label="\u26A1 Flux 2 (Latest)">',o+=`<option value="${f.FLUX_2.id}">${f.FLUX_2.name}</option>`,o+=`<option value="${f.FLUX_2_PRO.id}">${f.FLUX_2_PRO.name}</option>`,o+="</optgroup>",o+='<optgroup label="\u{1F3A8} Flux 1">',o+=`<option value="${f.FLUX_DEV.id}">${f.FLUX_DEV.name}</option>`,o+=`<option value="${f.FLUX_SCHNELL.id}">${f.FLUX_SCHNELL.name}</option>`,o+=`<option value="${f.FLUX_PRO.id}">${f.FLUX_PRO.name}</option>`,o+="</optgroup>",o+='<optgroup label="\u{1F31F} Premium">',o+=`<option value="${f.GEMINI_3_PRO.id}">${f.GEMINI_3_PRO.name}</option>`,o+=`<option value="${f.GPT_IMAGE_1.id}">${f.GPT_IMAGE_1.name}</option>`,o+=`<option value="${f.GPT_IMAGE_1_MINI.id}">${f.GPT_IMAGE_1_MINI.name}</option>`,o+=`<option value="${f.SEEDREAM_V4.id}">${f.SEEDREAM_V4.name}</option>`,o+="</optgroup>",o+='<optgroup label="\u{1F34C} Nano Banana">',o+=`<option value="${f.NANO_BANANA_PRO.id}">${f.NANO_BANANA_PRO.name}</option>`,o+=`<option value="${f.NANO_BANANA.id}">${f.NANO_BANANA.name}</option>`,o+="</optgroup>",o+='<optgroup label="\u26A1 SDXL (Fast)">',o+=`<option value="${f.SDXL.id}">${f.SDXL.name}</option>`,o+=`<option value="${f.SDXL_LIGHTNING.id}">${f.SDXL_LIGHTNING.name}</option>`,o+="</optgroup>",o+='<optgroup label="\u{1F4F7} Specialized">',o+=`<option value="${f.REALISTIC.id}">${f.REALISTIC.name}</option>`,o+=`<option value="${f.ANIME.id}">${f.ANIME.name}</option>`,o+="</optgroup>"):(o+='<optgroup label="\u26A1 Flux 2 Edit">',o+=`<option value="${A.FLUX_2_EDIT.id}">${A.FLUX_2_EDIT.name}</option>`,o+=`<option value="${A.FLUX_2_PRO_EDIT.id}">${A.FLUX_2_PRO_EDIT.name}</option>`,o+="</optgroup>",o+='<optgroup label="\u{1F31F} Premium Edit">',o+=`<option value="${A.GEMINI_3_PRO_EDIT.id}">${A.GEMINI_3_PRO_EDIT.name}</option>`,o+=`<option value="${A.IDEOGRAM_V3_EDIT.id}">${A.IDEOGRAM_V3_EDIT.name}</option>`,o+="</optgroup>",o+='<optgroup label="\u{1F34C} Nano Banana Edit">',o+=`<option value="${A.NANO_BANANA_PRO_EDIT.id}">${A.NANO_BANANA_PRO_EDIT.name}</option>`,o+=`<option value="${A.NANO_BANANA_EDIT.id}">${A.NANO_BANANA_EDIT.name}</option>`,o+="</optgroup>"):t==="text"?(o+='<optgroup label="\u{1F3AC} Sora 2 (OpenAI)">',o+=`<option value="${N.SORA_2.id}">${N.SORA_2.name}</option>`,o+=`<option value="${N.SORA_2_PRO.id}">${N.SORA_2_PRO.name}</option>`,o+="</optgroup>",o+='<optgroup label="\u{1F310} Veo 3.1 (Google)">',o+=`<option value="${N.VEO_3_1.id}">${N.VEO_3_1.name}</option>`,o+=`<option value="${N.VEO_3_1_FAST.id}">${N.VEO_3_1_FAST.name}</option>`,o+="</optgroup>",o+='<optgroup label="\u{1F3A5} Kling (ByteDance)">',o+=`<option value="${N.KLING_2_5_STANDARD.id}">${N.KLING_2_5_STANDARD.name}</option>`,o+=`<option value="${N.KLING_2_5_PRO.id}">${N.KLING_2_5_PRO.name}</option>`,o+="</optgroup>"):(o+='<optgroup label="\u{1F3AC} Sora 2 (OpenAI)">',o+=`<option value="${T.SORA_2.id}">${T.SORA_2.name}</option>`,o+=`<option value="${T.SORA_2_PRO.id}">${T.SORA_2_PRO.name}</option>`,o+="</optgroup>",o+='<optgroup label="\u{1F310} Veo 3.1 (Google)">',o+=`<option value="${T.VEO_3_1.id}">${T.VEO_3_1.name}</option>`,o+=`<option value="${T.VEO_3_1_FAST.id}">${T.VEO_3_1_FAST.name}</option>`,o+=`<option value="${T.VEO_3_1_REF.id}">${T.VEO_3_1_REF.name}</option>`,o+="</optgroup>",o+='<optgroup label="\u{1F3A5} Kling (ByteDance)">',o+=`<option value="${T.KLING_2_5_STANDARD.id}">${T.KLING_2_5_STANDARD.name}</option>`,o+=`<option value="${T.KLING_2_5_PRO.id}">${T.KLING_2_5_PRO.name}</option>`,o+="</optgroup>"),o}function no(){let e=document.getElementById("media-gen-container");if(!e)return;e.querySelectorAll(".media-gen-tab").forEach(n=>{n.addEventListener("click",()=>wt(n.dataset.tab))}),e.querySelectorAll(".source-type-btn").forEach(n=>{n.addEventListener("click",()=>bt(n.dataset.source))}),document.getElementById("media-gen-model")?.addEventListener("change",ao);let t=document.getElementById("image-dropzone"),o=document.getElementById("dropzone-file-input");t&&(t.addEventListener("click",n=>{n.target.id!=="dropzone-clear-btn"&&o?.click()}),t.addEventListener("dragover",n=>{n.preventDefault(),t.classList.add("dragover")}),t.addEventListener("dragleave",()=>{t.classList.remove("dragover")}),t.addEventListener("drop",io)),o?.addEventListener("change",so),document.getElementById("dropzone-url-btn")?.addEventListener("click",lo),document.getElementById("dropzone-media-btn")?.addEventListener("click",co);let r=document.getElementById("dropzone-url-input");r?.addEventListener("keypress",n=>{n.key==="Enter"&&ht()}),r?.addEventListener("blur",ht),document.getElementById("dropzone-clear-btn")?.addEventListener("click",n=>{n.stopPropagation(),po()}),document.getElementById("media-gen-submit")?.addEventListener("click",ft),document.getElementById("use-media-btn")?.addEventListener("click",mo),document.getElementById("regenerate-btn")?.addEventListener("click",ft)}function wt(e){re=e,document.querySelectorAll(".media-gen-tab").forEach(n=>{n.classList.toggle("active",n.dataset.tab===e)});let t=document.getElementById("media-gen-model");t&&(t.innerHTML=ke(e,C));let o=document.getElementById("size-section"),r=document.getElementById("negative-section");e==="video"?(o.style.display="none",r.style.display="none"):(o.style.display="block",r.style.display="block"),xt(),Le()}function bt(e){C=e,document.querySelectorAll(".source-type-btn").forEach(o=>{let r=o.dataset.source===e;o.classList.toggle("active",r),o.style.background=r?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.05)",o.style.borderColor=r?"rgba(255,255,255,0.3)":"rgba(255,255,255,0.15)",o.style.color=r?"#fff":"rgba(255,255,255,0.7)"});let t=document.getElementById("media-gen-model");t&&(t.innerHTML=ke(re,e)),xt(),Le()}function xt(){let e=document.getElementById("prompt-section"),t=document.getElementById("image-prompt-section"),o=document.getElementById("image-dropzone-section");C==="text"?(e&&(e.style.display="block"),t&&(t.style.display="none"),o&&(o.style.display="none")):(e&&(e.style.display="none"),t&&(t.style.display="block"),o&&(o.style.display="block"))}function ao(){}function io(e){e.preventDefault(),document.getElementById("image-dropzone")?.classList.remove("dragover");let o=e.dataTransfer?.files[0];o&&o.type.startsWith("image/")&&St(o)}function so(e){let t=e.target.files[0];t&&St(t)}async function St(e){let t=new FileReader;t.onload=o=>{_t(o.target.result)},t.readAsDataURL(e);try{q("Uploading image...",0);let o=new FormData;o.append("image",e);let n=await(await fetch(he.upload,{method:"POST",headers:{"X-WP-Nonce":window.lc_editor_rest_api_nonce},body:o})).json();if(n.url)document.getElementById("source-image-url").value=n.url,Y();else throw new Error(n.message||"Upload failed")}catch(o){j("Failed to upload image: "+o.message),Y()}}function lo(){let e=document.getElementById("dropzone-url-input");if(e){let t=e.style.display!=="none";e.style.display=t?"none":"block",t||e.focus()}}function ht(){let e=document.getElementById("dropzone-url-input")?.value?.trim();e&&(It(e),document.getElementById("dropzone-url-input").style.display="none")}function co(){if(typeof wp<"u"&&wp.media){let e=wp.media({title:"Select Source Image",button:{text:"Use This Image"},multiple:!1,library:{type:"image"}});e.on("select",()=>{let t=e.state().get("selection").first().toJSON();It(t.url)}),e.open()}else alert("WordPress Media Library not available.")}function It(e){document.getElementById("source-image-url").value=e,_t(e)}function _t(e){let t=document.getElementById("dropzone-content"),o=document.getElementById("dropzone-preview");t&&(t.style.display="none"),o&&(o.style.backgroundImage=`url(${e})`,o.style.display="block")}function po(){document.getElementById("source-image-url").value="";let e=document.getElementById("dropzone-content"),t=document.getElementById("dropzone-preview");e&&(e.style.display="block"),t&&(t.style.backgroundImage="",t.style.display="none");let o=document.getElementById("dropzone-file-input");o&&(o.value="")}async function ft(){if(me)return;let e=document.getElementById("media-gen-model")?.value,t=document.getElementById("source-image-url")?.value,o=document.getElementById("media-gen-size")?.value,r=document.getElementById("media-gen-negative")?.value,n,a=!1;if(C==="text"?(n=document.getElementById("media-gen-prompt")?.value?.trim(),a=document.getElementById("media-gen-auto-improve")?.checked||!1):(n=document.getElementById("media-gen-image-prompt")?.value?.trim()||"",a=document.getElementById("media-gen-auto-improve-image")?.checked||!1),C==="text"){if(!n){j("Please enter a prompt.");return}}else if(!t){j("Please provide a source image.");return}if(me=!0,go(),Le(),a&&n){q("Improving prompt with AI...",2,n);try{n=await oo(n),console.log("[Media Generator] Prompt improved:",n)}catch(s){console.warn("[Media Generator] Auto-improve failed, using original:",s)}}q("Starting generation...",5,n);let i=document.getElementById("media-gen-submit");i.disabled=!0,i.textContent="\u23F3 Generating...";try{let s={model:e,prompt:n||"Generate from image",image_size:o,negative_prompt:r};C==="image"&&t&&(s.image_url=t);let l=await fetch(he.generate,{method:"POST",headers:{"Content-Type":"application/json","X-WP-Nonce":window.lc_editor_rest_api_nonce},body:JSON.stringify(s)}),d=await l.json();if(!l.ok)throw new Error(d.message||"Generation failed");d.async&&d.request_id?await uo(d.request_id,n):vt(d)}catch(s){j(s.message)}finally{me=!1,i.disabled=!1,i.textContent="\u2728 Generate",Y()}}async function uo(e,t=null){let o=0,r=180;return new Promise((n,a)=>{G=setInterval(async()=>{if(o++,o>r){clearInterval(G),a(new Error("Generation timed out. Please try again."));return}try{let s=await(await fetch(he.status+e,{headers:{"X-WP-Nonce":window.lc_editor_rest_api_nonce}})).json(),l=Math.min(10+o/r*80,90),d=s.status==="in_progress"?"Generating video...":s.status==="queued"?`In queue (position: ${s.queue_position||"?"})...`:"Processing...";q(d,l,t),s.status==="completed"&&s.result?(clearInterval(G),vt(s.result),n(s.result)):s.status==="failed"&&(clearInterval(G),a(new Error("Generation failed on server.")))}catch(i){console.warn("Poll error:",i)}},2e3)})}function vt(e){q("Complete!",100);let t=null,o=!1;if(e.images&&e.images.length>0?t=e.images[0].url:e.video&&e.video.url?(t=e.video.url,o=!0):e.url&&(t=e.url,o=re==="video"),!t){j("No media URL in response.");return}let r=C==="text"?document.getElementById("media-gen-prompt"):document.getElementById("media-gen-image-prompt");M={url:t,type:o?"video":"image",prompt:r?.value||""};let n=document.getElementById("media-gen-result"),a=document.getElementById("result-preview"),i=document.getElementById("result-video");o?(a.style.backgroundImage="none",i.src=t,i.style.display="block"):(i.style.display="none",a.style.backgroundImage=`url(${t})`),n.style.display="block",Y()}async function mo(){if(M)try{q("Saving to Media Library...",0);let e=await fetch(he.save,{method:"POST",headers:{"Content-Type":"application/json","X-WP-Nonce":window.lc_editor_rest_api_nonce},body:JSON.stringify({url:M.url,type:M.type,alt:M.prompt?.substring(0,100)||"AI Generated",title:"AI: "+(M.prompt?.substring(0,50)||"Generated Media"),filename:`ai-${M.type}-${Date.now()}`})}),t=await e.json();if(!e.ok)throw new Error(t.message||"Failed to save media");Y(),ge&&ge({url:t.url,attachmentId:t.attachment_id,thumbnail:t.thumbnail,type:M.type,alt:M.prompt?.substring(0,100)}),$e()}catch(e){j("Failed to save: "+e.message),Y()}}function q(e,t,o=null){let r=document.getElementById("media-gen-progress"),n=document.getElementById("progress-text"),a=document.getElementById("progress-bar"),i=document.getElementById("progress-prompt-preview");r&&(r.style.display="block"),n&&(n.textContent=e),a&&(a.style.width=`${t}%`),i&&(o?(i.textContent="Prompt: "+(o.length>100?o.substring(0,100)+"...":o),i.style.display="block"):i.style.display="none")}function Y(){let e=document.getElementById("media-gen-progress");e&&(e.style.display="none")}function j(e){let t=document.getElementById("media-gen-error");t&&(t.textContent=e,t.style.display="block")}function go(){let e=document.getElementById("media-gen-error");e&&(e.style.display="none")}function Le(){let e=document.getElementById("media-gen-result");e&&(e.style.display="none"),M=null}function ho(){G&&(clearInterval(G),G=null),me=!1,M=null,ge=null,C="text"}var _={CODE_ONLY:"code_only",TEXT_ONLY:"text_only",FULL_GENERATION:"full_generation",IMAGE_ENHANCEMENT:"image_enhancement",TRANSLATION:"translation",ACCESSIBILITY:"accessibility",SEO_OPTIMIZATION:"seo",STORYTELLING:"storytelling"};async function Re(e,t="",o="anthropic/claude-haiku-4.5"){try{let n=(await I(o,[{role:"system",content:`You are a workflow router. Analyze the user's request and determine which workflow to use.

WORKFLOWS:
- "code_only": Modify/edit HTML structure, add components, change layout, adapt content
- "text_only": ONLY improve text without changing HTML structure (grammar, rewrite, shorten)
- "full_generation": Create entirely NEW sections/pages from scratch
- "translation": Translate content to another language
- "image_enhancement": Generate or replace images
- "seo": SEO optimization, meta tags
- "accessibility": ARIA, a11y improvements
- "storytelling": Rewrite content with a specific narrative style/angle (e.g. "make it more persuasive", "use StoryBrand framework")

RULES:
1. If user wants to ADAPT, MODIFY, or CHANGE existing content \u2192 "code_only"
2. If user wants to CREATE NEW content from scratch \u2192 "full_generation"  
3. If user only wants TEXT improvements without structure changes \u2192 "text_only"
4. If translating \u2192 "translation"
5. If user mentions "narrative", "storytelling", "rewrite as AIDA", "rewrite as story" \u2192 "storytelling"

Respond with ONLY the workflow name, nothing else.`},{role:"user",content:`Request: "${e}"
${t?"Has existing HTML: YES":"Has existing HTML: NO"}`}],{temperature:0,max_tokens:20})).choices[0]?.message?.content?.trim().toLowerCase()||"code_only";return Object.values(_).includes(n)?n:_.CODE_ONLY}catch(r){return console.warn("Workflow detection failed, defaulting to code_only:",r),_.CODE_ONLY}}async function fo(e,t=()=>{}){try{if(t({type:"state_update",state:{progress:{message:"Improving text content..."}}}),!e.currentHtml||e.currentHtml.trim()==="")throw new Error("No HTML content to improve. Please select an element first.");let o=await I(e.selectedModel,[{role:"system",content:de()},{role:"user",content:`Improve the text in this HTML. Keep ALL HTML structure exactly the same.

<html>
${e.currentHtml}
</html>

Task: ${e.userPrompt}

${e.websiteInfo?`Brand context: ${e.websiteInfo}`:""}

Return ONLY the HTML with improved text, no explanations.`}],{temperature:.5});if(!o||!o.choices||!o.choices[0])throw new Error("Empty response from AI. Please try again.");let r=o.choices[0]?.message?.content||"";if(!r||r.trim()==="")throw new Error("AI returned empty content. Please try again.");return r.startsWith("```")&&(r=r.replace(/^```html?\n?/,"").replace(/\n?```$/,"")),t({type:"complete",state:{finalHtml:r}}),{finalHtml:r,workflow:_.TEXT_ONLY}}catch(o){throw console.error("TEXT_ONLY workflow error:",o),t({type:"error",error:o.message}),o}}async function yo(e,t=()=>{}){let o=e.userPrompt.match(/translate to (\w+)/i),r=o?o[1]:"English";t({type:"state_update",state:{progress:{message:`Translating to ${r}...`}}});let a=(await I(e.selectedModel||"openai/gpt-5.1",[{role:"system",content:`You are an expert translator. Translate text content to ${r}.

CRITICAL RULES:
- Keep ALL HTML tags, attributes, classes exactly the same
- Only translate text between tags
- Preserve formatting and whitespace
- Maintain brand terms and proper nouns if appropriate
- Output ONLY the translated HTML, no markdown or explanations`},{role:"user",content:`Translate this HTML to ${r}:

${e.currentHtml}`}],{temperature:.3})).choices[0]?.message?.content||e.currentHtml;return a.startsWith("```")&&(a=a.replace(/^```html?\n?/,"").replace(/\n?```$/,"")),t({type:"complete",state:{finalHtml:a}}),{finalHtml:a,workflow:_.TRANSLATION}}async function wo(e,t=()=>{}){t({type:"state_update",state:{progress:{message:"Analyzing image requirements..."}}});let o=await I(e.selectedModel||"openai/gpt-5.1",[{role:"system",content:`Analyze this HTML and identify images that need to be generated.
Return a JSON array with objects like:
[{"selector": "img.hero-image", "prompt": "detailed image prompt", "size": "landscape_16_9"}]

Only include images that are placeholders or need replacement.
Return [] if no images need generation.`},{role:"user",content:`HTML to analyze:
${e.currentHtml}

User request: ${e.userPrompt}`}],{temperature:.3}),r=[];try{let s=(o.choices[0]?.message?.content||"[]").match(/\[[\s\S]*\]/);r=s?JSON.parse(s[0]):[]}catch(i){console.warn("Could not parse image prompts:",i)}if(r.length===0)return t({type:"complete",state:{finalHtml:e.currentHtml}}),{finalHtml:e.currentHtml,workflow:_.IMAGE_ENHANCEMENT,imagesGenerated:0};let n=e.currentHtml,a=0;for(let i of r)try{t({type:"node_end",node:"imager",state:{progress:{message:`Generating image: ${i.prompt.slice(0,50)}...`}}});let s=await te({prompt:i.prompt,size:i.size||"landscape_16_9",model:f.FLUX_DEV});if(s.images&&s.images[0]){let l=s.images[0].wpUrl;n=n.replace(/src=["']([^"']*placeholder[^"']*|https?:\/\/placehold[^"']*|https?:\/\/via\.placeholder[^"']*)["']/gi,`src="${l}"`),a++}}catch(s){console.error("Image generation failed:",s)}return t({type:"complete",state:{finalHtml:n}}),{finalHtml:n,workflow:_.IMAGE_ENHANCEMENT,imagesGenerated:a}}async function bo(e,t=()=>{}){t({type:"state_update",state:{progress:{message:"Optimizing for SEO..."}}});let r=(await I(e.selectedModel||"openai/gpt-5.1",[{role:"system",content:`You are an SEO expert. Optimize this HTML for search engines:

IMPROVEMENTS TO MAKE:
- Add/improve semantic HTML tags (h1, h2, article, section, etc.)
- Ensure proper heading hierarchy
- Add relevant keywords naturally
- Improve meta-friendliness of content
- Add structured data attributes where appropriate
- Ensure alt texts are descriptive
- Make text scannable with clear hierarchy

Keep the visual design the same. Output ONLY HTML, no explanations.`},{role:"user",content:`Optimize this HTML for SEO:

${e.currentHtml}

${e.websiteInfo?`Business context: ${e.websiteInfo}`:""}
${e.userPrompt?`Additional instructions: ${e.userPrompt}`:""}`}],{temperature:.3})).choices[0]?.message?.content||e.currentHtml;return r.startsWith("```")&&(r=r.replace(/^```html?\n?/,"").replace(/\n?```$/,"")),t({type:"complete",state:{finalHtml:r}}),{finalHtml:r,workflow:_.SEO_OPTIMIZATION}}async function xo(e,t=()=>{}){t({type:"state_update",state:{progress:{message:"Improving accessibility..."}}});let r=(await I(e.selectedModel||"openai/gpt-5.1",[{role:"system",content:`You are an accessibility expert. Improve this HTML for WCAG compliance:

IMPROVEMENTS TO MAKE:
- Add ARIA labels and roles where needed
- Ensure proper heading hierarchy (h1 -> h2 -> h3)
- Add alt texts to images
- Ensure sufficient color contrast mentions
- Add skip navigation links if appropriate
- Ensure form labels are associated
- Add keyboard navigation hints
- Use semantic HTML elements

Keep the visual design the same. Output ONLY HTML, no explanations.`},{role:"user",content:`Improve accessibility of this HTML:

${e.currentHtml}`}],{temperature:.3})).choices[0]?.message?.content||e.currentHtml;return r.startsWith("```")&&(r=r.replace(/^```html?\n?/,"").replace(/\n?```$/,"")),t({type:"complete",state:{finalHtml:r}}),{finalHtml:r,workflow:_.ACCESSIBILITY}}async function Et(e,t=()=>{}){let o=e.helperModel||"anthropic/claude-haiku-4.5",r=e.workflowType||await Re(e.userPrompt,e.currentHtml,o);switch(console.log(`Running workflow: ${r}`),r){case _.TEXT_ONLY:return fo(e,t);case _.TRANSLATION:return yo(e,t);case _.IMAGE_ENHANCEMENT:return wo(e,t);case _.SEO_OPTIMIZATION:return bo(e,t);case _.ACCESSIBILITY:return xo(e,t);case _.STORYTELLING:return ut(e,t);case _.FULL_GENERATION:return F(e,t);case _.CODE_ONLY:default:return F(e,t)}}function So(e,t){let o=(e||"/wp-json/").replace(/\/+$/,""),r=String(t||"").replace(/^\/+/,"");return`${o}/${r}`}function Io(e){try{let o=new URL(e).pathname.split("/").filter(Boolean);return o.length?o[o.length-1]:null}catch{return null}}var _o={async checkStatus(){return Fe()},async run(e){let{prompt:t,currentHtml:o="",model:r="openai/gpt-5.1-codex",helperModel:n="anthropic/claude-haiku-4.5",framework:a={name:"Bootstrap",version:"5.3"},websiteInfo:i="",pageTextContent:s="",workflowType:l=null,storytellingPreset:d="STORYBRAND",imageSource:c="placeholder",imageModel:p="fal-ai/flux-2-pro",imageSize:u="auto",uiKit:h="",neighborContext:g="",pageContext:m="",designContext:y="",fullPageMode:S=!1,forceSequential:w=!1,structuredMode:P=!1,predefinedSections:D=null,awarenessMode:W="section",phaseThreshold:U=null,imageDifferentiate:E=void 0,imagePreserveAspect:k=void 0,globalImagePrompt:L="",referenceImageUrl:ne="",imageUrl:ae="",editPreset:ie="",onProgress:Tt=()=>{}}=e,At={userPrompt:t,currentHtml:o,selectedModel:r,helperModel:n,framework:a,websiteInfo:i||window.lc_editor_website_info||"",pageTextContent:s,workflowType:l,storytellingPreset:d,imageSource:c,imageModel:p,imageSize:u,uiKit:h,neighborContext:g,pageContext:m,designContext:y,fullPageMode:!!S,forceSequential:!!w,structuredMode:!!P,predefinedSections:Array.isArray(D)?D:[],awarenessMode:W,phaseThreshold:U,imageDifferentiate:E,imagePreserveAspect:k,globalImagePrompt:L,referenceImageUrl:ne,imageUrl:ae,editPreset:ie},K=await Et(At,Tt);return{html:K.finalHtml,workflow:K.workflow,sections:K.generatedSections,error:K.error,metadata:{imagesGenerated:K.imagesGenerated}}},async generate(e){return this.run({...e,workflowType:_.CODE_ONLY})},async screenshotToCode(e){let{screenshot:t,additionalPrompt:o="",model:r="google/gemini-3-pro-preview",framework:n={name:"Bootstrap",version:"5.3"},websiteInfo:a="",onProgress:i=()=>{}}=e;if(!t)throw new Error("Screenshot is required for screenshot-to-code");let s={userPrompt:o,screenshot:t,selectedModel:r,framework:n,websiteInfo:a||window.lc_editor_website_info||""},l=await F(s,i);return{html:l.finalHtml,error:l.error}},async quickGenerate(e,t="",o="openai/gpt-5.1-codex"){return mt({userPrompt:e,currentHtml:t,selectedModel:o,websiteInfo:window.lc_editor_website_info||""})},async generateFullPage(e){let{prompt:t,model:o="openai/gpt-5.1-codex",framework:r={name:"Bootstrap",version:"5.3"},websiteInfo:n="",onProgress:a=()=>{}}=e,i={userPrompt:t,selectedModel:o,framework:r,websiteInfo:n||window.lc_editor_website_info||"",mode:"generate"},s=await gt(i,a);return{html:s.finalHtml,sections:s.generatedSections,error:s.error}},async generateImage(e){let{saveToMedia:t=!0,...o}=e;return t?te(o):H(o)},async saveImage(e,t={}){return z(e,t)},findImagePlaceholders(e){return Te(e)},async generateAllImages(e){return st(e)},IMAGE_STYLES:Z,async improveText(e){return this.run({...e,workflowType:_.TEXT_ONLY})},async translate(e){return this.run({...e,workflowType:_.TRANSLATION})},async optimizeSEO(e){return this.run({...e,workflowType:_.SEO_OPTIMIZATION})},async improveAccessibility(e){return this.run({...e,workflowType:_.ACCESSIBILITY})},async enhanceWithImages(e){return this.run({...e,workflowType:_.IMAGE_ENHANCEMENT})},getProvider(e){return Q(e)},normalizeModel(e){let t=Q(e);return ce(e,t)},async detectWorkflow(e,t=""){return Re(e,t)},openMediaGenerator(e={}){yt(e)},closeMediaGenerator(){$e()},async uploadImage(e){let t=window.lc_editor_rest_api_url||"/wp-json/",o=window.lc_editor_rest_api_nonce,r=So(t,"livecanvas/v1/ai/fal/upload");if(!o)throw new Error("REST nonce missing (lc_editor_rest_api_nonce)");if(typeof File<"u"&&e instanceof File){let n=new FormData;n.append("image",e,e.name||`upload-${Date.now()}.png`);let a=await fetch(r,{method:"POST",headers:{"X-WP-Nonce":o},body:n}),i=await a.json().catch(()=>({}));if(!a.ok)throw new Error(i.message||i.error||`Upload failed (${a.status})`);if(!i.url)throw new Error("Upload succeeded but no url returned");return i.url}if(typeof e=="string"&&e.trim()){let n=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json","X-WP-Nonce":o},body:JSON.stringify({image_base64:e})}),a=await n.json().catch(()=>({}));if(!n.ok)throw new Error(a.message||a.error||`Upload failed (${n.status})`);if(!a.url)throw new Error("Upload succeeded but no url returned");return a.url}throw new Error("uploadImage: invalid input (expected File or base64 string)")},async generateSingleImage(e){let{prompt:t,model:o="fal-ai/flux-2-pro",imageSize:r="landscape_16_9",negativePrompt:n="",seed:a=null}=e||{};if(!t)throw new Error("generateSingleImage: prompt is required");let s=(await te({prompt:t,model:o,size:r,numImages:1,negativePrompt:n,seed:a}))?.images?.[0],l=s?.wpUrl||s?.url;if(!l)throw new Error("generateSingleImage: no image url returned");return{url:l,filename:Io(l),attachmentId:s?.attachmentId,thumbnail:s?.thumbnail}},async scanUIKit(e,t="anthropic/claude-haiku-4.5"){if(!e||e.length<50)throw new Error("Not enough HTML content to analyze. Please add some sections to your page first.");let o=e.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"").replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,"").replace(/<!--[\s\S]*?-->/g,"").replace(/\s+/g," ").trim();o=o.substring(0,15e3),console.log("[UI Kit Scanner] Starting scan with model:",t),console.log("[UI Kit Scanner] HTML length:",o.length);try{let r=await I(t,[{role:"system",content:qe()},{role:"user",content:`Analyze this HTML and extract a UI Kit specification. Focus on colors, typography, spacing, and component patterns:

<html>
${o}
</html>`}],{temperature:.3,max_tokens:1e3});console.log("[UI Kit Scanner] Response received:",r);let n=r.choices?.[0]?.message?.content?.trim();return n||(console.error("[UI Kit Scanner] Empty response. Full response object:",JSON.stringify(r,null,2)),`Could not extract a distinct UI Kit from this page. The page might be empty or too generic.

Recommended: Select a preset from the dropdown above, or manually enter your design specifications.`)}catch(r){throw console.error("[UI Kit Scanner] Error:",r),new Error(`UI Kit scan failed: ${r.message||"Unknown error"}. Try selecting a different model.`)}},async improvePrompt(e,t="anthropic/claude-haiku-4.5"){if(!e)throw new Error("No prompt provided");console.log("[Prompt Improver] Starting with model:",t);try{let r=(await I(t,[{role:"system",content:`You are an expert Prompt Engineer for AI Image and Video generation (Midjourney, Flux, Sora, etc.).
Your goal is to enhance the user's prompt to be more descriptive, detailed, and likely to generate high-quality results.

OUTPUT FORMAT:
Return ONLY the improved prompt text. No explanations, no "Here is the improved prompt:".

IMPROVEMENTS TO MAKE:
1. Add sensory details (lighting, texture, atmosphere)
2. Specify style (photorealistic, cinematic, 3D render, oil painting, etc.) if implied or fitting
3. Improve clarity and subject focus
4. Add technical keywords (4k, 8k, high resolution, detailed) where appropriate
5. Keep it concise but potent (aim for 1-3 sentences max)

STYLE CONTEXT HANDLING:
- If the user includes a [Style context: ...] section, incorporate those design elements naturally
- Translate UI/web design terms (e.g., "Colors: primary=#6366f1") into visual language (e.g., "indigo/purple tones")
- Match the aesthetic feel (corporate, startup, minimal, etc.) in the image style
- Do NOT include the raw style context in your output - incorporate it naturally

EXAMPLES:
- Input: "office team meeting [Style context: Colors: primary=#6366f1, Style: Modern, clean, SaaS]"
- Output: "Professional team collaborating in a modern glass office, indigo accent lighting, clean minimal interior design, warm natural light from large windows, 4k, photorealistic"

- Input: "hero image for tech website [Style context: Style: Dark mode, edgy, bold]"
- Output: "Abstract technology concept, dark moody atmosphere with neon accents, geometric shapes, dramatic lighting, cinematic wide angle, 8k ultra detailed"`},{role:"user",content:`Improve this image/video generation prompt:

${e}`}],{temperature:.7})).choices[0]?.message?.content?.trim();if(!r)throw new Error("Empty response from AI");return r.replace(/^["']|["']$/g,"")}catch(o){throw console.error("[Prompt Improver] Error:",o),o}},async improveCodePrompt(e,t={}){let{model:o="anthropic/claude-haiku-4.5",uiKit:r="",framework:n="Bootstrap 5.3"}=t;if(!e)throw new Error("No prompt provided");console.log("[Code Prompt Improver] Starting with model:",o);let a="";r&&(a=`

The user has defined a UI Kit with these specifications:
${r}

Reference these design specifications in your improved prompt where relevant.`);try{let s=(await I(o,[{role:"system",content:`You are an expert Prompt Engineer specializing in AI-powered web development and HTML/CSS code generation.

Your goal is to transform vague or incomplete user prompts into clear, specific, actionable instructions that will generate better code output.

## OUTPUT FORMAT
Return ONLY the improved prompt text. No explanations, no markdown formatting, no "Here is the improved prompt:".

## IMPROVEMENTS TO MAKE

1. **Specificity**: Add concrete details about layout, components, and structure
   - Bad: "Create a hero section"
   - Good: "Create a hero section with a bold headline on the left (60% width), a CTA button below it, and a product mockup image on the right (40% width). Use a subtle gradient background."

2. **Visual Description**: Specify colors, spacing, typography when implied
   - Bad: "Make it modern"
   - Good: "Use clean sans-serif typography, generous whitespace (py-5 sections), rounded corners on cards, and subtle shadows for depth"

3. **Component Clarity**: Name specific UI patterns
   - Bad: "Add some testimonials"
   - Good: "Add 3 testimonial cards in a row with avatar (circular), 5-star rating, quote text, and name/title below"

4. **Responsive Intent**: Clarify breakpoint behavior if needed
   - "Stack to single column on mobile" or "Hide sidebar on tablet and below"

5. **Framework Alignment**: Reference ${n} classes/patterns when appropriate
   - "Use Bootstrap card component" or "Apply Tailwind's grid system"

6. **Action Verbs**: Start with clear directives
   - "Create...", "Redesign...", "Add...", "Replace...", "Improve..."

## EXAMPLES

Input: "make a pricing section"
Output: "Create a pricing section with 3 tier cards (Basic, Pro, Enterprise) in a row. Each card should include: tier name, monthly price in large text, a list of 5-6 features with checkmarks, and a CTA button. Highlight the middle (Pro) tier as 'Most Popular' with a subtle border or badge. Add a toggle switch above for monthly/yearly pricing."

Input: "improve the hero"
Output: "Enhance the hero section: increase headline font size for impact (display-3 or larger), add a short subheadline below explaining the value proposition in one sentence, make the CTA button more prominent with a contrasting color and hover effect, and add subtle background visual interest (gradient, pattern, or decorative shapes)."

Input: "add features"
Output: "Create a features section with 4 feature cards in a 2x2 grid (single column on mobile). Each card should have: an icon at the top (use Font Awesome or Bootstrap Icons), a bold title, and 2-3 lines of description. Use consistent spacing and subtle hover effects on cards."

## PRESERVE USER INTENT
- Keep the core intent of the original prompt
- Don't change what they're asking for, just make it clearer
- If they mention specific colors, text, or requirements, keep them
- Add helpful details, don't contradict their vision`},{role:"user",content:`Improve this code generation prompt for a ${n} website:${a}

Original prompt:
${e}`}],{temperature:.5})).choices[0]?.message?.content?.trim();if(!s)throw new Error("Empty response from AI");return s.replace(/^["']|["']$/g,"").replace(/^```[\s\S]*?```$/gm,"").trim()}catch(i){throw console.error("[Code Prompt Improver] Error:",i),i}},async improveUIKit(e,t="anthropic/claude-haiku-4.5"){if(!e)throw new Error("No UI Kit specification provided");console.log("[UI Kit Improver] Starting with model:",t),console.log("[UI Kit Improver] Input spec:",e.substring(0,200)+"...");try{let o=await I(t,[{role:"system",content:`You are an expert Design System Architect. Your goal is to refine and expand a UI Kit specification to make it more professional, consistent, and complete.

OUTPUT FORMAT:
Return ONLY the improved UI Kit specification text. Use the same section format:
Colors: ...
Typography: ...
Spacing: ...
Corners: ...
Shadows: ...
Style: ...
Components: ...

IMPROVEMENTS TO MAKE:
1. Add hex codes to colors if missing (e.g., primary=#6366f1)
2. Standardize color naming (primary, secondary, accent, background, text)
3. Ensure typography includes font family, sizes, and weights
4. Add specific measurements to spacing (e.g., p-4 = 24px)
5. Fill in missing sections with sensible defaults
6. Make the Style description evocative (e.g., "Modern, clean, professional SaaS")
7. Be specific about component patterns

DO NOT include any explanations, markdown, or code blocks. Just the improved specification text.`},{role:"user",content:`Improve this UI Kit specification:

${e}`}],{temperature:.3,max_tokens:4e3});console.log("[UI Kit Improver] Response received:",o);let r=o.choices?.[0]?.message,n=r?.content?.trim();return!n&&r?.reasoning?(console.warn("[UI Kit Improver] Model returned reasoning but no content (likely hit max_tokens). Using reasoning as fallback."),console.error("[UI Kit Improver] Reasoning model did not complete. Try a different model (e.g., gemini-2.5-flash)."),e):n?(console.log("[UI Kit Improver] Improved spec:",n.substring(0,200)+"..."),n):(console.error("[UI Kit Improver] Empty response. Full response:",JSON.stringify(o,null,2)),e)}catch(o){throw console.error("[UI Kit Improver] Error:",o),new Error(`UI Kit improvement failed: ${o.message||"Unknown error"}`)}},Events:O,Workflows:_,ImageModels:f,ImageEditModels:A,VideoModels:T,ImageSizes:at,getModelId:it,RecommendedModels:{code:"openai/gpt-5.1-codex",vision:"google/gemini-3-pro-preview",text:"anthropic/claude-opus-4.5",fast:"google/gemini-2.5-flash-preview",translation:"openai/gpt-5.1",budget:"deepseek/deepseek-r1:free",image:"fal-ai/flux-2-pro",video:"fal-ai/sora-2/image-to-video"},setTracing(e){Ue(e)},configureLangSmith(e){Ge(e)},isLangSmithEnabled(){return De()},getLangSmithStatus(){return He()},version:"2.3.0"};typeof window<"u"&&(window.LiveCanvasAI=_o);})();
