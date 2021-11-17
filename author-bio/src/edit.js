import { __ } from "@wordpress/i18n";
import {
	RichText,
	useBlockProps,
	MediaUpload,
	AlignmentToolbar,
	InspectorControls,
	ColorPalette,
	BlockControls,
} from "@wordpress/block-editor";
import { Button, Icon, PanelBody } from "@wordpress/components";

import "./editor.scss";

export default function Edit(props) {
	const {
		attributes: {
			title,
			content,
			mediaID,
			mediaAlt,
			mediaURL,
			backgroundColor,
			contentAlignment,
		},
		setAttributes,
	} = props;

	const onSelectImage = (media) => {
		setAttributes({
			mediaAlt: media.alt,
			mediaID: media.id,
			mediaURL: media.url,
		});
	};

	const onCloseImage = (media) => {
		if (!media) {
			setAttributes({
				mediaAlt: null,
				mediaID: null,
				mediaURL: null,
			});
		}
	};

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
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()} style={{ backgroundColor }}>
				<div className="author-bio__container">
					<BlockControls>
						<AlignmentToolbar
							value={contentAlignment}
							onChange={(val) => setAttributes({ contentAlignment: val })}
						/>
					</BlockControls>
					<div className="author-bio__image">
						<MediaUpload
							onSelect={onSelectImage}
							onClose={onCloseImage}
							allowedTypes="image"
							value={mediaID}
							render={({ open }) => (
								<Button
									className={mediaID ? "image-button" : "button button-large"}
									onClick={open}
								>
									{!mediaID ? (
										<Icon icon="format-image" />
									) : (
										<img src={mediaURL} alt={mediaAlt} />
									)}
								</Button>
							)}
						/>
					</div>
					<div className="author-bio__content">
						<div className="author-bio__title">
							<RichText
								tagName="h2"
								style={{ textAlign: contentAlignment }}
								placeholder={__("Write author name...", "copywriter-blocks")}
								value={title}
								onChange={(val) => setAttributes({ title: val })}
							/>
						</div>

						<RichText
							tagName="div"
							placeholder={__(
								"Write a biography for that author that brings out credibility and authority to your readers...",
								"copywriter-blocks"
							)}
							className="author-bio__text"
							value={content}
							multiline="p"
							onChange={(val) => setAttributes({ content: val })}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
