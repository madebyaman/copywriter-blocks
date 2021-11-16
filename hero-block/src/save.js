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
			imageURL,
			imageAlt,
			backgroundOpacity,
			backgroundColor,
			contentFontSize,
			titleFontSize,
			contentColor,
			primaryButtonColor,
			secondaryButtonColor,
			primaryButtonBackgroundColor,
			secondaryButtonBorderColor,
			contentAlignment,
		},
	} = props;

	return (
		<div {...useBlockProps.save()}>
			<div
				className="copywriter-theme-hero-block"
				style={{ background: backgroundColor }}
			>
				<div className="copywriter-hero-block__container">
					{title && (
						<RichText.Content
							tagName="h2"
							className="hero-block__title"
							value={title}
							style={{
								color: contentColor,
								fontSize: titleFontSize + "px",
								textAlign: contentAlignment,
							}}
						/>
					)}
					{content && (
						<RichText.Content
							tagName="div"
							className="hero-block__content"
							value={content}
							style={{
								color: contentColor,
								fontSize: contentFontSize + "px",
								textAlign: contentAlignment,
							}}
						/>
					)}
					<div className="hero-block__buttons">
						{primaryButtonText && (
							<div className="hero-block__primary-button">
								<a
									href={primaryButtonURL}
									className="primary hero-block__button"
									style={{
										backgroundColor: primaryButtonBackgroundColor,
										color: primaryButtonColor,
									}}
								>
									<RichText.Content value={primaryButtonText} />
								</a>
							</div>
						)}
						{secondaryButtonText && (
							<div className="hero-block__secondary-button">
								<a
									href={secondaryButtonURL}
									className="secondary hero-block__button"
									style={{
										borderColor: secondaryButtonBorderColor,
										color: secondaryButtonColor,
									}}
								>
									<RichText.Content value={secondaryButtonText} />
								</a>
							</div>
						)}
					</div>
				</div>
				{imageURL && !!imageURL.length && (
					<div className="image-wrap">
						<img
							src={imageURL}
							alt={imageAlt}
							style={{
								opacity: backgroundOpacity + "%",
							}}
							className="coppywriter-hero-image"
						/>
					</div>
				)}
			</div>
		</div>
	);
}
