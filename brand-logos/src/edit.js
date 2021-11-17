import { __ } from "@wordpress/i18n";
import {
	RichText,
	useBlockProps,
	MediaUpload,
	InspectorControls,
	ColorPalette,
} from "@wordpress/block-editor";
import { Button, Icon, PanelBody, RangeControl } from "@wordpress/components";

import "./editor.scss";

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
				<PanelBody title={__("Basic Settings", "copywriter-blocks")}>
					<div className="components-base-control">
						<div className="components-base-control__field">
							<label className="components-base-control__label">
								{__("Background Color", "copywriter-blocks")}
							</label>
							<ColorPalette
								value={backgroundColor}
								onChange={(val) => setAttributes({ backgroundColor: val })}
							/>
						</div>
					</div>
					<RangeControl
						label={__("Images opacity", "copywriter-blocks")}
						value={opacity}
						onChange={(val) => setAttributes({ opacity: val })}
						min={0}
						max={100}
						step={10}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()} style={{ backgroundColor }}>
				<div className="copywriter-brand-logos__container">
					<RichText
						tagName="h2"
						placeholder={__("Enter title...", "copywriter-blocks")}
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
