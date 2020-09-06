registerLayout(
  "center",
  class {
    async layout(children, edges, constraints) {
      /* width */
      const availableInlineSize = constraints.fixedInlineSize;
      /* height */
      const availableBlockSize = constraints.fixedBlockSize;

      /* get children */
      let childFragments = [];
      for (let child of children) {
        childFragments.push(
          await child.layoutNextFragment({
            availableInlineSize,
            availableBlockSize
          })
        );
      }

      /* lets do some layout!! */
      /* here lol */

      return {
        childFragments
      };
    }

    async intrinsicSizes() {}
  }
);

/*
VERTICAL ONLY
for (let fragment of childFragments) {
	fragment.inlineOffset = (availableInlineSize - fragment.inlineSize) / 2;
}

W/ADJUSTS
let offset = 0;
for (let fragment of childFragments) {
	fragment.blockOffset = (availableBlockSize - fragment.blockSize) / 2 + offset;
	fragment.inlineOffset = (availableInlineSize - fragment.inlineSize) / 2;
	offset += fragment.blockSize;
}


FINALE:
for (let fragment of childFragments) {
	fragment.blockOffset -= offset / 4;
}


*/
