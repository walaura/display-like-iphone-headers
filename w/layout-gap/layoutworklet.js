registerLayout(
  "center",
  class {
    async layout(children, edges, constraints, props) {
      /* width */
      const maxAvailableInlineSize = constraints.fixedInlineSize;
      /* height */
      const maxAvailableBlockSize = constraints.fixedBlockSize;

      const bounds = {
        start: 0,
        end: 0,
      };

      const middleAt = Math.floor(children.length / 2);
      let start = children.slice(0, middleAt);
      let middle = children[middleAt];
      let end = children.slice(middleAt + 1);
      let endBlocks = [];
      let startBlocks = [];

      /* end first */
      for (let child of end) {
        child = await child.layoutNextFragment({
          availableInlineSize: maxAvailableInlineSize,
        });
        child.inlineOffset = maxAvailableInlineSize - child.inlineSize;
        bounds.end += child.inlineSize;
        endBlocks.push(child);
      }
      /* and start */
      for (let child of start) {
        child = await child.layoutNextFragment({
          availableInlineSize: maxAvailableInlineSize,
        });
        child.inlineOffset = 0;
        bounds.start += child.inlineSize;
        startBlocks.push(child);
      }

      /* middle stuff */
      middle = await middle.layoutNextFragment({
        availableInlineSize: maxAvailableInlineSize - bounds.start - bounds.end,
      });

      const centeredInlineOffset =
        maxAvailableInlineSize / 2 - middle.inlineSize / 2;
      const inlineOffset = Math.max(bounds.start, centeredInlineOffset);
      middle.inlineOffset = inlineOffset;

      /* center it all */
      const childFragments = [...startBlocks, middle, ...endBlocks];
      for (let child of childFragments) {
        child.blockOffset = maxAvailableBlockSize / 2 - child.blockSize / 2;
      }

      return {
        childFragments,
      };
    }
    async intrinsicSizes() {}
  }
);

/*

GAP:
static get inputProperties() {
	return ['--gap'];
}

const gap = props.get("--gap").value || 0;

*/
