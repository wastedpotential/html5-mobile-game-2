export * from '@pixi/constants';
export * from '@pixi/math';
export * from '@pixi/runner';
export * from '@pixi/settings';
export * from '@pixi/ticker';
import * as utils from '@pixi/utils';
export { utils };
export * from '@pixi/display';
export * from '@pixi/core';
export * from '@pixi/events';
export * from '@pixi/loaders';
export * from '@pixi/sprite';
export * from '@pixi/app';
export * from '@pixi/sprite-animated';
export * from '@pixi/sprite-tiling';
export * from '@pixi/spritesheet';
export * from '@pixi/text';
export * from '@pixi/interaction';

// Renderer plugins
import { Renderer } from '@pixi/core';
import { BatchRenderer } from '@pixi/core';
Renderer.registerPlugin('batch', BatchRenderer);
import { InteractionManager } from '@pixi/interaction';
Renderer.registerPlugin('interaction', InteractionManager);
import { TilingSpriteRenderer } from '@pixi/sprite-tiling';
Renderer.registerPlugin('tilingSprite', TilingSpriteRenderer);

// Application plugins
import { Application } from '@pixi/app';
import { AppLoaderPlugin } from '@pixi/loaders';
Application.registerPlugin(AppLoaderPlugin);
import { TickerPlugin } from '@pixi/ticker';
Application.registerPlugin(TickerPlugin);

// Loader plugins
import { Loader } from '@pixi/loaders';
import { SpritesheetLoader } from '@pixi/spritesheet';
Loader.registerPlugin(SpritesheetLoader);

// Filters
import { AlphaFilter } from '@pixi/filter-alpha';
export const filters = {
	AlphaFilter,
};
