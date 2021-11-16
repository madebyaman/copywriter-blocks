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

import {
	RichText,
	URLInput,
	useBlockProps,
	InspectorControls,
	MediaUpload,
	PanelColorSettings,
	BlockControls,
	AlignmentToolbar,
} from "@wordpress/block-editor";
import {
	Button,
	Icon,
	PanelBody,
	RangeControl,
	ResponsiveWrapper,
	TextControl,
	ToggleControl,
} from "@wordpress/components";

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
			imageID,
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
		isSelected,
		setAttributes,
	} = props;

	const onRemoveImage = () => {
		setAttributes({
			imageID: null,
			imageURL: null,
			imageAlt: null,
		});
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Background Settings", "copywriter-theme-blocks")}>
					<p>{__("Select a background image:", "copywriter-theme-blocks")}</p>
					<MediaUpload
						onSelect={(img) =>
							setAttributes({
								imageURL: img.url,
								imageID: img.id,
								imageAlt: img.alt,
							})
						}
						type="image"
						value={imageID}
						render={({ open }) => (
							<div>
								<Button
									className="copywriter-hero-block components-button"
									label={__("Edit image", "copywriter-theme-blocks")}
									onClick={open}
								>
									<Icon icon="format-image" />
									{__("Select image", "copywriter-theme-blocks")}
								</Button>
								{imageURL && !!imageURL.length && (
									<Button
										className="copywriter-hero-block components-button"
										label={__("Remove image", "copywriter-theme-blocks")}
										onClick={onRemoveImage}
									>
										<Icon icon="dismiss"></Icon>
										{__("Remove image", "copywriter-theme-blocks")}
									</Button>
								)}
							</div>
						)}
					/>
					<RangeControl
						label={__("Image opacity", "copywriter-theme-blocks")}
						value={backgroundOpacity}
						onChange={(val) => setAttributes({ backgroundOpacity: val })}
						min={0}
						max={100}
						step={10}
					/>
					<PanelColorSettings
						title={__("Background Color", "copywriter-theme-blocks")}
						initialOpen={false}
						colorSettings={[
							{
								value: backgroundColor,
								onChange: (val) => setAttributes({ backgroundColor: val }),
								label: __("Overlay Color", "copywriter-theme-blocks"),
							},
						]}
					></PanelColorSettings>
				</PanelBody>
				<PanelBody title={__("Typography", "copywriter-theme-blocks")}>
					<RangeControl
						label={__("Title Font Size", "copywriter-theme-blocks")}
						value={titleFontSize}
						onChange={(val) => setAttributes({ titleFontSize: val })}
						min={24}
						max={60}
						step={2}
					/>
					<RangeControl
						label={__("Text Font Size", "copywriter-theme-blocks")}
						value={contentFontSize}
						onChange={(val) => setAttributes({ contentFontSize: val })}
						min={14}
						max={24}
						step={1}
					/>
					<PanelColorSettings
						title={__("Text Color", "copywriter-theme-blocks")}
						initialOpen={false}
						colorSettings={[
							{
								value: contentColor,
								onChange: (val) => setAttributes({ contentColor: val }),
								label: __("Text color", "copywriter-theme-blocks"),
							},
						]}
					></PanelColorSettings>
				</PanelBody>
				<PanelBody title={__("Button Settings", "copywriter-theme-blocks")}>
					<PanelColorSettings
						title={__(
							"Primary Button Color Settings",
							"copywriter-theme-blocks"
						)}
						initialOpen={false}
						colorSettings={[
							{
								value: primaryButtonColor,
								onChange: (val) => setAttributes({ primaryButtonColor: val }),
								label: __("Primary Button Color", "copywriter-theme-blocks"),
							},
							{
								value: primaryButtonBackgroundColor,
								onChange: (val) =>
									setAttributes({ primaryButtonBackgroundColor: val }),
								label: __(
									"Primary Button Background Color",
									"copywriter-theme-blocks"
								),
							},
							{
								value: secondaryButtonColor,
								onChange: (val) => setAttributes({ secondaryButtonColor: val }),
								label: __("Secondary Button Color", "copywriter-theme-blocks"),
							},
							{
								value: secondaryButtonBorderColor,
								onChange: (val) =>
									setAttributes({ secondaryButtonBorderColor: val }),
								label: __(
									"Secondary Button Border Color",
									"copywriter-theme-blocks"
								),
							},
						]}
					></PanelColorSettings>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				<BlockControls>
					<AlignmentToolbar
						value={contentAlignment}
						onChange={(val) => setAttributes({ contentAlignment: val })}
					/>
				</BlockControls>
				<div
					className="copywriter-theme-hero-block"
					style={{ background: backgroundColor }}
				>
					<div className="copywriter-hero-block__container">
						<RichText
							tagName="h2"
							placeholder={__("Hero Title", "copywriter-theme-blocks")}
							value={title}
							className="hero-block__title"
							style={{
								color: contentColor,
								fontSize: titleFontSize + "px",
								textAlign: contentAlignment,
							}}
							onChange={(val) => setAttributes({ title: val })}
						/>

						<RichText
							tagName="div"
							multiline="p"
							placeholder={__("Enter content", "copywriter-theme-blocks")}
							className="hero-block__content"
							value={content}
							style={{
								color: contentColor,
								fontSize: contentFontSize + "px",
								textAlign: contentAlignment,
							}}
							onChange={(val) => setAttributes({ content: val })}
						/>

						<div className="hero-block__buttons">
							<div className="hero-block__primary-button">
								<RichText
									tagName="span"
									placeholder={__("Button text...", "copywriter-theme-blocks")}
									value={primaryButtonText}
									allowedFormats={[]}
									className="primary hero-block__button"
									style={{
										backgroundColor: primaryButtonBackgroundColor,
										color: primaryButtonColor,
									}}
									onChange={(val) => setAttributes({ primaryButtonText: val })}
								/>
								{isSelected && (
									<form key="form-link" onSubmit={(e) => e.preventDefault()}>
										<URLInput
											value={primaryButtonURL}
											onChange={(val) =>
												setAttributes({ primaryButtonURL: val })
											}
										/>
										<Button
											label={__("Apply", "copywriter-theme-blocks")}
											type="submit"
										>
											<Icon icon="editor-break" />
										</Button>
									</form>
								)}
							</div>

							<div className="hero-block__secondary-button">
								<RichText
									tagName="span"
									placeholder={__("Button text...", "copywriter-theme-blocks")}
									value={secondaryButtonText}
									allowedFormats={[]}
									className="secondary hero-block__button"
									style={{
										borderColor: secondaryButtonBorderColor,
										color: secondaryButtonColor,
									}}
									onChange={(val) =>
										setAttributes({ secondaryButtonText: val })
									}
								/>
								{isSelected && (
									<form key="form-link" onSubmit={(e) => e.preventDefault()}>
										<URLInput
											value={secondaryButtonURL}
											onChange={(val) =>
												setAttributes({ secondaryButtonURL: val })
											}
										/>
										<Button
											label={__("Apply", "copywriter-theme-blocks")}
											type="submit"
										>
											<Icon icon="editor-break" />
										</Button>
									</form>
								)}
							</div>
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
		</>
	);
}
