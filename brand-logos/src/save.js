/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { RichText, useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save(props) {
	const {
		attributes: {
			title,
			imageOneAlt,
			imageOneURL,
			imageTwoAlt,
			imageTwoURL,
			imageThreeAlt,
			imageThreeURL,
			backgroundColor,
			opacity,
		},
	} = props;

	return (
		<>
			<div {...useBlockProps.save()} style={{ backgroundColor }}>
				<div className="brand-logos__container">
					<RichText.Content tagName="h2" value={title} className="title" />
					<div className="logo-container">
						<img
							style={{ opacity: opacity + "%" }}
							src={imageOneURL}
							alt={imageOneAlt}
							className="image-one"
						/>
						<img
							style={{ opacity: opacity + "%" }}
							src={imageTwoURL}
							alt={imageTwoAlt}
							className="image-two"
						/>
						<img
							style={{ opacity: opacity + "%" }}
							src={imageThreeURL}
							alt={imageThreeAlt}
							className="image-three"
						/>
					</div>
				</div>
			</div>
		</>
	);
}
