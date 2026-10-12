<script>
import { onDestroy, onMount } from "svelte";
import { pioConfig } from "@/config";

const pioOptions = {
	mode: pioConfig.mode,
	hidden: pioConfig.hiddenOnMobile,
	content: pioConfig.dialog || {},
	model: pioConfig.models || ["/pio/models/pio/model.json"],
};

let pioInitialized = false;
let pioContainer;
let pioCanvas;
let mobileHidden = false;
let disposed = false;
let assetsPromise;
let mobileQuery;

// 等待脚本真正加载完成，不能仅凭 script 标签存在就开始初始化。
function loadScript(src, id, isReady) {
	if (isReady()) return Promise.resolve();
	return new Promise((resolve, reject) => {
		let script = document.getElementById(id);
		const existing = Boolean(script);
		if (!script) {
			script = document.createElement("script");
			script.id = id;
			script.src = src;
		}
		const cleanup = () => {
			script.removeEventListener("load", loaded);
			script.removeEventListener("error", failed);
		};
		const loaded = () => {
			cleanup();
			if (isReady()) resolve();
			else {
				script.remove();
				reject(new Error(`Pio script did not initialize: ${src}`));
			}
		};
		const failed = () => {
			cleanup();
			script.remove();
			reject(new Error(`Failed to load Pio script: ${src}`));
		};
		script.addEventListener("load", loaded, { once: true });
		script.addEventListener("error", failed, { once: true });
		if (!existing) document.head.appendChild(script);
	});
}

async function initPio() {
	if (disposed || mobileHidden || pioInitialized) return;
	try {
		assetsPromise ||= loadScript("/pio/static/l2d.js", "pio-l2d-script", () => typeof loadlive2d === "function")
			.then(() => loadScript("/pio/static/pio.js", "pio-main-script", () => typeof Paul_Pio === "function"));
		await assetsPromise;
		if (disposed || mobileHidden || pioInitialized || !pioContainer || !pioCanvas) return;
		new Paul_Pio(pioOptions);
		pioInitialized = true;
	} catch (error) {
		assetsPromise = null;
		console.error("Pio initialization failed:", error);
	}
}

function updateVisibility() {
	mobileHidden = Boolean(pioConfig.hiddenOnMobile && mobileQuery.matches);
	if (!mobileHidden) void initPio();
}

onMount(() => {
	if (!pioConfig.enable) return;
	// 只在手机断点隐藏，较窄的桌面窗口仍然初始化看板娘。
	mobileQuery = window.matchMedia("(max-width: 768px)");
	mobileQuery.addEventListener("change", updateVisibility);
	updateVisibility();
});

onDestroy(() => {
	disposed = true;
	mobileQuery?.removeEventListener("change", updateVisibility);
});
</script>

{#if pioConfig.enable}
  <div class={`pio-container ${pioConfig.position || 'right'}`} class:mobile-hidden={mobileHidden} bind:this={pioContainer}>
    <div class="pio-action"></div>
    <canvas
      id="pio"
      bind:this={pioCanvas}
      width={pioConfig.width || 280}
      height={pioConfig.height || 250}
    ></canvas>
  </div>
{/if}

<style>
  .mobile-hidden {
    display: none;
  }
</style>
