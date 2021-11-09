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
			content,
			primaryButtonText,
			primaryButtonURL,
			secondaryButtonText,
			secondaryButtonURL,
		},
	} = props;

	return (
		<div {...useBlockProps.save()}>
			<div className="test-hero-block">
				{title && <RichText.Content tagName="h1" value={title} />}
				{content && (
					<RichText.Content tagName="div" className="text" value={content} />
				)}
				<div className="buttons">
					{primaryButtonText && (
						<div className="primary-button">
							<a href={primaryButtonURL} className="primary button">
								<RichText.Content value={primaryButtonText} />
							</a>
						</div>
					)}
					{secondaryButtonText && (
						<div className="secondary-button">
							<a href={secondaryButtonURL} className="secondary button">
								<RichText.Content value={secondaryButtonText} />
							</a>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
