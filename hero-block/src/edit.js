import { __ } from "@wordpress/i18n";
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
import { Button, Icon, PanelBody, RangeControl } from "@wordpress/components";

import "./editor.scss";

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
				<PanelBody title={__("Background Settings", "copywriter-blocks")}>
					<p>{__("Select a background image:", "copywriter-blocks")}</p>
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
									label={__("Edit image", "copywriter-blocks")}
									onClick={open}
								>
									<Icon icon="format-image" />
									{__("Select image", "copywriter-blocks")}
								</Button>
								{imageURL && !!imageURL.length && (
									<Button
										className="copywriter-hero-block components-button"
										label={__("Remove image", "copywriter-blocks")}
										onClick={onRemoveImage}
									>
										<Icon icon="dismiss"></Icon>
										{__("Remove image", "copywriter-blocks")}
									</Button>
								)}
							</div>
						)}
					/>
					<RangeControl
						label={__("Image opacity", "copywriter-blocks")}
						value={backgroundOpacity}
						onChange={(val) => setAttributes({ backgroundOpacity: val })}
						min={0}
						max={100}
						step={10}
					/>
					<PanelColorSettings
						title={__("Background Color", "copywriter-blocks")}
						initialOpen={false}
						colorSettings={[
							{
								value: backgroundColor,
								onChange: (val) => setAttributes({ backgroundColor: val }),
								label: __("Overlay Color", "copywriter-blocks"),
							},
						]}
					></PanelColorSettings>
				</PanelBody>
				<PanelBody title={__("Typography", "copywriter-blocks")}>
					<RangeControl
						label={__("Title Font Size", "copywriter-blocks")}
						value={titleFontSize}
						onChange={(val) => setAttributes({ titleFontSize: val })}
						min={24}
						max={60}
						step={2}
					/>
					<RangeControl
						label={__("Text Font Size", "copywriter-blocks")}
						value={contentFontSize}
						onChange={(val) => setAttributes({ contentFontSize: val })}
						min={14}
						max={24}
						step={1}
					/>
					<PanelColorSettings
						title={__("Text Color", "copywriter-blocks")}
						initialOpen={false}
						colorSettings={[
							{
								value: contentColor,
								onChange: (val) => setAttributes({ contentColor: val }),
								label: __("Text color", "copywriter-blocks"),
							},
						]}
					></PanelColorSettings>
				</PanelBody>
				<PanelBody title={__("Button Settings", "copywriter-blocks")}>
					<PanelColorSettings
						title={__("Primary Button Color Settings", "copywriter-blocks")}
						initialOpen={false}
						colorSettings={[
							{
								value: primaryButtonColor,
								onChange: (val) => setAttributes({ primaryButtonColor: val }),
								label: __("Primary Button Color", "copywriter-blocks"),
							},
							{
								value: primaryButtonBackgroundColor,
								onChange: (val) =>
									setAttributes({ primaryButtonBackgroundColor: val }),
								label: __(
									"Primary Button Background Color",
									"copywriter-blocks"
								),
							},
							{
								value: secondaryButtonColor,
								onChange: (val) => setAttributes({ secondaryButtonColor: val }),
								label: __("Secondary Button Color", "copywriter-blocks"),
							},
							{
								value: secondaryButtonBorderColor,
								onChange: (val) =>
									setAttributes({ secondaryButtonBorderColor: val }),
								label: __("Secondary Button Border Color", "copywriter-blocks"),
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
					className="copywriter-hero-block"
					style={{ background: backgroundColor }}
				>
					<div className="copywriter-hero-block__container">
						<RichText
							tagName="h2"
							placeholder={__("Hero Title", "copywriter-blocks")}
							value={title}
							className="hero-block__title"
							allowedFormats={["core/bold", "core/italic"]}
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
							placeholder={__("Enter content", "copywriter-blocks")}
							className="hero-block__content"
							value={content}
							allowedFormats={[
								"core/bold",
								"core/italic",
								"core/list",
								"core/link",
							]}
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
									placeholder={__("Button text...", "copywriter-blocks")}
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
											label={__("Apply", "copywriter-blocks")}
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
									placeholder={__("Button text...", "copywriter-blocks")}
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
											label={__("Apply", "copywriter-blocks")}
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
