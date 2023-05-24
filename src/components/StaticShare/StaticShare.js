import React from "react";
import {
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton
} from "react-share";
import './assets/styles/_index.scss';

const StaticShare = (props) => {

    // Social share
	const shareurl = typeof window !== 'undefined' ? window.location.href : ''
	
	// const [Shareicons,setShareicons] = React.useState(false);
	
	// const openShareicons = () => {
	//     setShareicons(true);
    //     if(Shareicons === true) {
    //         setShareicons(false);
    //     }
	// }

	const trackerShare = (event) => {    
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({
		'event': 'Share - social icons',
		'formType': event + ' - ' +shareurl,
		'formId': 'Share',
		'formName': 'Share',
		'formLabel': 'Share'
	});    
	}
	// Social share

    return (
        <>
            <div className="static-detail-text-sm secondary-text">Share</div>
            <div className="static-social-share-list">
                <FacebookShareButton onClick={()=>trackerShare('FacebookShareButton')} url={shareurl} className="my-share-button facebook-share">
                    <i className="icon icon-fb-primary"></i>
                </FacebookShareButton>
                <TwitterShareButton onClick={()=>trackerShare('TwitterShareButton')} url={shareurl} className="my-share-button twitter-share">
                    <i className="icon icon-twitter-primary"></i>
                </TwitterShareButton>
                {/* <button>
                    <i className="icon icon-insta-primary"></i>
                </button> */}
                <LinkedinShareButton onClick={()=>trackerShare('LinkedinShareButton')} url={shareurl} className="my-share-button linkedin-share">
                    <i className="icon icon-linkedin-primary"></i>
                </LinkedinShareButton>
            </div>
        </>
    )
}

export default StaticShare