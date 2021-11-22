<?php
/**
 *
 * @package           copywriter-blocks
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/writing-your-first-block-type/
 */
function create_block_hero_block_block_init() {
	register_block_type( __DIR__ );
}
add_action( 'init', 'create_block_hero_block_block_init' );
