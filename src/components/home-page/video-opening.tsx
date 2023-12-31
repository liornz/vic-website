import styles from './video-opening.module.scss';

interface Props {}

const VideoOpening: React.FC<Props> = (props) => {
  const {} = props;
  return (
    <div className={styles.video_container}>
      <video
        autoPlay
        loop
        muted
        poster=""
        className={styles.video}
        width="100%"
      >
        {/* <source src="/videos/vic3.webm" type="video/webm" /> */}
        <source src="/videos/vic3.mp4" type="video/mp4" />
        Sorry, your browser does not support embedded videos.
      </video>
    </div>
  );
};

export default VideoOpening;
