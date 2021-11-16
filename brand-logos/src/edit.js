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
	useBlockProps,
	MediaUpload,
	InspectorControls,
	ColorPalette,
} from "@wordpress/block-editor";

import { Button, Icon, PanelBody, RangeControl } from "@wordpress/components";

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
			imageOneID,
			imageOneAlt,
			imageOneURL,
			imageTwoID,
			imageTwoAlt,
			imageTwoURL,
			imageThreeID,
			imageThreeAlt,
			imageThreeURL,
			backgroundColor,
			opacity,
		},
		setAttributes,
	} = props;

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Basic Settings", "copywriter-theme-blocks")}>
					<div className="components-base-control">
						<div className="components-base-control__field">
							<label className="components-base-control__label">
								{__("Background Color", "copywriter-theme-blocks")}
							</label>
							<ColorPalette
								value={backgroundColor}
								onChange={(val) => setAttributes({ backgroundColor: val })}
							/>
						</div>
					</div>
					<RangeControl
						label={__("Images opacity", "copywriter-theme-blocks")}
						value={opacity}
						onChange={(val) => setAttributes({ opacity: val })}
						min={0}
						max={100}
						step={10}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()} style={{ backgroundColor }}>
				<div className="brand-logos__container">
					<RichText
						tagName="h2"
						placeholder={__("Enter title...", "copywriter-theme-blocks")}
						value={title}
						className="title"
						allowedFormats={["core/bold", "core/italic"]}
						onChange={(val) => setAttributes({ title: val })}
					/>
					<div className="logo-container">
						<div className="image-one" style={{ opacity: opacity + "%" }}>
							<MediaUpload
								onSelect={(media) =>
									setAttributes({
										imageOneAlt: media.alt,
										imageOneID: media.id,
										imageOneURL: media.url,
									})
								}
								allowedTypes="image"
								value={imageOneID}
								render={({ open }) => (
									<Button
										className={
											imageOneID ? "image-button" : "button button-large"
										}
										onClick={open}
									>
										{!imageOneID ? (
											<Icon icon="format-image" />
										) : (
											<img src={imageOneURL} alt={imageOneAlt} />
										)}
									</Button>
								)}
							/>
						</div>
						<div className="image-two" style={{ opacity: opacity + "%" }}>
							<MediaUpload
								onSelect={(media) =>
									setAttributes({
										imageTwoAlt: media.alt,
										imageTwoID: media.id,
										imageTwoURL: media.url,
									})
								}
								allowedTypes="image"
								value={imageTwoID}
								render={({ open }) => (
									<Button
										className={
											imageTwoID ? "image-button" : "button button-large"
										}
										onClick={open}
									>
										{!imageTwoID ? (
											<Icon icon="format-image" />
										) : (
											<img src={imageTwoURL} alt={imageTwoAlt} />
										)}
									</Button>
								)}
							/>
						</div>
						<div className="image-three" style={{ opacity: opacity + "%" }}>
							<MediaUpload
								onSelect={(media) =>
									setAttributes({
										imageThreeAlt: media.alt,
										imageThreeID: media.id,
										imageThreeURL: media.url,
									})
								}
								allowedTypes="image"
								value={imageThreeID}
								render={({ open }) => (
									<Button
										className={
											imageThreeID ? "image-button" : "button button-large"
										}
										onClick={open}
									>
										{!imageThreeID ? (
											<Icon icon="format-image" />
										) : (
											<img src={imageThreeURL} alt={imageThreeAlt} />
										)}
									</Button>
								)}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
