import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const ImageWithFallback = (props) => {
    const { 
			src, 
			fallbackSrc = 'https://ams.com.kh/wp-content/uploads/2021/09/cropped-favicon-1.png', 
			width = '16',
			height = '9',
			layout = "responsive" ,
			objectFit = "cover",
			alt = "RADIO",
			...rest 
		} = props;
    const [imgSrc, setImgSrc] = useState(src);

    return (
			<>
				<Image
					{...rest}
					src={imgSrc || '/'}
					alt={alt}
					width={width}
					height={height}
					layout={layout}
					objectFit={objectFit}
					onError={() => {
						setImgSrc(fallbackSrc);
					}}
				/>
			</>
			
    );
};

export default ImageWithFallback;