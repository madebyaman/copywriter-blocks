<?php

/**
 * Plugin Name: Copywriter Theme Blocks
 * Description: This is a plugin used by copywriter theme for custom blocks
 * Version: 1.0.0
 * Author: Aman Thakur
 *
 * @package copywriter-blocks
 */

defined ('ABSPATH') || exit;

include 'hero-block/hero-block.php';
include 'testimonial/index.php';
include 'author-bio/author-bio.php';
include 'brand-logos/brand-logos.php';
include 'cta/cta.php';


/**
 * Add custom "Podkit" block category
 *
 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/filters/block-filters/#managing-block-categories
 */
add_filter( 'block_categories', 'copywriter_block_categories', 10, 2 );

function copywriter_block_categories( $categories, $post ) {
	if ( $post->post_type !== 'post' ) {
		return $categories;
	}
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'copywriter-blocks',
				'title' => __( 'Copywriter', 'podkit' ),
				'icon'  => 'slides',
			),
		)
	);
}
