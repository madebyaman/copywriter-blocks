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
			backgroundColor,
			content,
			buttonText,
			buttonURL,
			contentAlignment,
			borderColor,
			borderSize,
			buttonBackgroundColor,
			buttonTextColor,
			buttonShape,
			buttonSize,
		},
	} = props;

	return (
		<div
			{...useBlockProps.save()}
			style={{
				backgroundColor,
				border: borderSize + "px" + " solid" + " " + borderColor,
			}}
		>
			<div className="cta__container" style={{ textAlign: contentAlignment }}>
				{content && (
					<RichText.Content
						tagName="div"
						className="cta__content"
						value={content}
					/>
				)}
				<div className="cta__button">
					{buttonText && (
						<a
							href={buttonURL}
							className={`button ${buttonShape} ${buttonSize}`}
							style={{
								color: buttonTextColor,
								backgroundColor: buttonBackgroundColor,
							}}
						>
							<RichText.Content value={buttonText} />
						</a>
					)}
				</div>
			</div>
		</div>
	);
}
