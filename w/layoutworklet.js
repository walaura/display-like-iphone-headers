registerLayout(
  "like-the-iphone-headers",
  class {
    async layout(children, edges, constraints, props) {
      /* this is the parents width/height */
      const maxAvailableInlineSize = constraints.fixedInlineSize;
      const maxAvailableBlockSize = constraints.fixedBlockSize;

      /* and how much the stuff on the sides take */
      const bounds = {
        start: 0,
        end: 0,
      };

      const middleAt = Math.floor(children.length / 2);
      const start = children.slice(0, middleAt);
      const middle = children[middleAt];
      const end = children.slice(middleAt + 1);

      const blocks = {
        end: [],
        start: [],
        middle: undefined,
      };

      /* end first */
      for (let child of end) {
        child = await child.layoutNextFragment({
          availableInlineSize: maxAvailableInlineSize,
        });
        child.inlineOffset =
          maxAvailableInlineSize - child.inlineSize - bounds.end;
        bounds.end += child.inlineSize;
        blocks.end.push(child);
      }
      /* and start */
      for (let child of start) {
        child = await child.layoutNextFragment({
          availableInlineSize: maxAvailableInlineSize,
        });
        child.inlineOffset = 0 + bounds.start;
        bounds.start += child.inlineSize;
        blocks.start.push(child);
      }

      /* middle stuff */
      blocks.middle = await middle.layoutNextFragment({
        availableInlineSize: maxAvailableInlineSize - bounds.start - bounds.end,
      });

      const centeredInlineOffset =
        maxAvailableInlineSize / 2 - blocks.middle.inlineSize / 2;
      const inlineOffset = Math.max(bounds.start, centeredInlineOffset);

      const pushItFromTheRightByPx = Math.min(
        0,
        maxAvailableInlineSize -
          bounds.end -
          (inlineOffset + blocks.middle.inlineSize)
      );

      blocks.middle.inlineOffset = inlineOffset + pushItFromTheRightByPx;

      const childFragments = [...blocks.start, blocks.middle, ...blocks.end];

      /* vertically center it all */
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
