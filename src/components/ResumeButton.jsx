import MyButton from './MyButton';

const ResumeButton = () => {
  const openPDF = () => {
    const url = '/Yossi Elgazari - SW Developer.pdf';
    const newWindow = window.open(url, '_blank');

    // If the browser blocks the popup, this will fail
    if (newWindow) {
      newWindow.opener = null; // Prevent access to the opening window
      newWindow.focus(); // Focus the new window/tab
    } else {
      // Fallback for when the popup is blocked
      alert('Please allow popups for this website to view the resume.');
    }
  };

  return (
    <div>
      <MyButton onClick={openPDF}>Resume</MyButton>
    </div>
  );
};

export default ResumeButton;