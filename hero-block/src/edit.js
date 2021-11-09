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

import { RichText, URLInput, useBlockProps } from "@wordpress/block-editor";
import { Button, Icon } from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	const {
		attributes: {
			title,
			content,
			primaryButtonText,
			primaryButtonURL,
			secondaryButtonText,
			secondaryButtonURL,
		},
		isSelected,
		setAttributes,
	} = props;

	return (
		<div {...useBlockProps()}>
			<div className="test-hero-block">
				<RichText
					tagName="h1"
					placeholder={__("Hero Title", "test-hero-block")}
					value={title}
					onChange={(val) => setAttributes({ title: val })}
				/>

				<RichText
					tagName="div"
					multiline="p"
					placeholder={__("Enter content", "test-hero-block")}
					className="text"
					value={content}
					onChange={(val) => setAttributes({ content: val })}
				/>

				<div className="buttons">
					<div className="primary-button">
						<RichText
							tagName="span"
							placeholder={__("Button text...", "test-hero-block")}
							value={primaryButtonText}
							allowedFormats={[]}
							className="primary button"
							onChange={(val) => setAttributes({ primaryButtonText: val })}
						/>
						{isSelected && (
							<form key="form-link" onSubmit={(e) => e.preventDefault()}>
								<URLInput
									value={primaryButtonURL}
									onChange={(val) => setAttributes({ primaryButtonURL: val })}
								/>
								<Button label={__("Apply", "test-hero-block")} type="submit">
									<Icon icon="editor-break" />
								</Button>
							</form>
						)}
					</div>

					<div className="secondary-button">
						<RichText
							tagName="span"
							placeholder={__("Button text...", "test-hero-block")}
							value={secondaryButtonText}
							allowedFormats={[]}
							className="secondary button"
							onChange={(val) => setAttributes({ secondaryButtonText: val })}
						/>
						{isSelected && (
							<form key="form-link" onSubmit={(e) => e.preventDefault()}>
								<URLInput
									value={secondaryButtonURL}
									onChange={(val) => setAttributes({ secondaryButtonURL: val })}
								/>
								<Button label={__("Apply", "test-hero-block")} type="submit">
									<Icon icon="editor-break" />
								</Button>
							</form>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
