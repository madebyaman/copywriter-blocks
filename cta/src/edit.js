import { __ } from "@wordpress/i18n";
import {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	RichText,
	URLInput,
	useBlockProps,
	ColorPalette,
} from "@wordpress/block-editor";
import "./editor.scss";
import {
	Button,
	Icon,
	PanelBody,
	RangeControl,
	SelectControl,
} from "@wordpress/components";

export default function Edit(props) {
	const {
		attributes: {
			content,
			buttonURL,
			buttonText,
			contentAlignment,
			backgroundColor,
			borderColor,
			borderSize,
			buttonBackgroundColor,
			buttonTextColor,
			buttonShape,
			buttonSize,
		},
		isSelected,
		setAttributes,
	} = props;

	const buttonSizeOptions = [
		{ value: "cw-button-size-small", label: __("Small") },
		{ value: "cw-button-size-medium", label: __("Medium") },
		{ value: "cw-button-size-large", label: __("Large") },
		{ value: "cw-button-size-extralarge", label: __("Extra Large") },
	];

	// Button shape
	const buttonShapeOptions = [
		{ value: "cw-button-shape-square", label: __("Square") },
		{ value: "cw-button-shape-rounded", label: __("Rounded Square") },
		{ value: "cw-button-shape-circular", label: __("Circular") },
	];

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Background Settings", "copywriter-blocks")}>
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
					<div className="components-base-control">
						<div className="components-base-control__field">
							<label className="components-base-control__label">
								{__("Border Color", "copywriter-blocks")}
							</label>
							<ColorPalette
								value={borderColor}
								onChange={(val) => setAttributes({ borderColor: val })}
							/>
						</div>
					</div>
					<RangeControl
						label={__("Border Size", "copywriter-blocks")}
						value={borderSize}
						onChange={(val) => setAttributes({ borderSize: val })}
						min={0}
						max={10}
						step={1}
					/>
				</PanelBody>
				<PanelBody title={__("Button Settings", "copywriter-blocks")}>
					<SelectControl
						label={__("Button Size", "copywriter-blocks")}
						value={buttonSize}
						options={buttonSizeOptions.map(({ value, label }) => ({
							value,
							label,
						}))}
						onChange={(val) => setAttributes({ buttonSize: val })}
					/>
					<SelectControl
						label={__("Button Shape", "copywriter-blocks")}
						value={buttonShape}
						options={buttonShapeOptions.map(({ value, label }) => ({
							value,
							label,
						}))}
						onChange={(val) => setAttributes({ buttonShape: val })}
					/>
					<div className="components-base-control">
						<div className="components-base-control__field">
							<label className="components-base-control__label">
								{__("Button Text Color", "copywriter-blocks")}
							</label>
							<ColorPalette
								value={buttonTextColor}
								onChange={(val) => setAttributes({ buttonTextColor: val })}
							/>
						</div>
					</div>
					<div className="components-base-control">
						<div className="components-base-control__field">
							<label className="components-base-control__label">
								{__("Button Background Color", "copywriter-blocks")}
							</label>
							<ColorPalette
								value={buttonBackgroundColor}
								onChange={(val) =>
									setAttributes({ buttonBackgroundColor: val })
								}
							/>
						</div>
					</div>
				</PanelBody>
			</InspectorControls>
			<div
				{...useBlockProps()}
				style={{
					backgroundColor,
					border: borderSize + "px" + " solid" + " " + borderColor,
				}}
			>
				<BlockControls>
					<AlignmentToolbar
						value={contentAlignment}
						onChange={(val) => setAttributes({ contentAlignment: val })}
					/>
				</BlockControls>
				<div
					className="copywriter-cta__container"
					style={{ textAlign: contentAlignment }}
				>
					<RichText
						tagName="div"
						multiline="p"
						placeholder={__(
							"Enter attention capturing text...",
							"copywriter-blocks"
						)}
						className="cta__content"
						value={content}
						onChange={(val) => setAttributes({ content: val })}
					/>
					<div className="cta__button">
						<RichText
							tagName="span"
							placeholder={__("Button text...", "copywriter-blocks")}
							value={buttonText}
							className={`button ${buttonShape} ${buttonSize}`}
							onChange={(val) => setAttributes({ buttonText: val })}
							allowedFormats={[]}
							style={{
								color: buttonTextColor,
								backgroundColor: buttonBackgroundColor,
							}}
						/>
						{isSelected && (
							<form key="form-link" onSubmit={(e) => e.preventDefault()}>
								<URLInput
									value={buttonURL}
									onChange={(val) => setAttributes({ buttonURL: val })}
								/>
								<Button label={__("Apply", "copywriter-blocks")} type="submit">
									<Icon icon="editor-break" />
								</Button>
							</form>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
