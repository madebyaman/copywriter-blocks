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
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	RichText,
	URLInput,
	useBlockProps,
	ColorPalette,
	PanelColorSettings,
} from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
import {
	Button,
	Icon,
	PanelBody,
	RangeControl,
	SelectControl,
} from "@wordpress/components";

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
				<PanelBody title={__("Background Settings", "copywriter-theme-blocks")}>
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
					<div className="components-base-control">
						<div className="components-base-control__field">
							<label className="components-base-control__label">
								{__("Border Color", "copywriter-theme-blocks")}
							</label>
							<ColorPalette
								value={borderColor}
								onChange={(val) => setAttributes({ borderColor: val })}
							/>
						</div>
					</div>
					<RangeControl
						label={__("Border Size", "copywriter-theme-blocks")}
						value={borderSize}
						onChange={(val) => setAttributes({ borderSize: val })}
						min={0}
						max={10}
						step={1}
					/>
				</PanelBody>
				<PanelBody title={__("Button Settings", "copywriter-theme-blocks")}>
					<SelectControl
						label={__("Button Size", "copywriter-theme-blocks")}
						value={buttonSize}
						options={buttonSizeOptions.map(({ value, label }) => ({
							value,
							label,
						}))}
						onChange={(val) => setAttributes({ buttonSize: val })}
					/>
					<SelectControl
						label={__("Button Shape", "copywriter-theme-blocks")}
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
								{__("Button Text Color", "copywriter-theme-blocks")}
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
								{__("Button Background Color", "copywriter-theme-blocks")}
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
				<div className="cta__container" style={{ textAlign: contentAlignment }}>
					<RichText
						tagName="div"
						multiline="p"
						placeholder={__(
							"Enter attention capturing text...",
							"copywriter-theme-blocks"
						)}
						className="cta__content"
						value={content}
						onChange={(val) => setAttributes({ content: val })}
					/>
					<div className="cta__button">
						<RichText
							tagName="span"
							placeholder={__("Button text...", "copywriter-theme-blocks")}
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
		</>
	);
}
