/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * useBlockProps is a React hook that is used to mark the block wrapper element.
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
			mediaAlt,
			mediaURL,
			contentAlignment,
			backgroundColor,
		},
	} = props;

	return (
		<div {...useBlockProps.save()} style={{ backgroundColor }}>
			<div className="author-bio__container">
				<img className="author-bio__image" src={mediaURL} alt={mediaAlt} />
				<div className="author-bio__content">
					<div className="author-bio__title">
						<RichText.Content
							tagName="h2"
							value={title}
							style={{ textAlign: contentAlignment }}
						/>
					</div>
					<RichText.Content
						tagName="div"
						className="author-bio__text"
						value={content}
					/>
				</div>
			</div>
		</div>
	);
}
