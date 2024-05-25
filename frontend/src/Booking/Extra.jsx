import React, { useRef, useState, useCallback, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const MyEditorComponent = () => {
  const editor = useRef(null);
  const [message, setMessage] = useState('');

  const config = useMemo(() => ({
    height: 400, // Set the height of the editor
    readonly: false, // All options from https://xdsoft.net/jodit/doc/
    toolbarSticky: false, // Keeps the toolbar non-sticky if that might cause issues
  }), []);

  const handleBlur = useCallback((newContent) => {
    setMessage(newContent);
  }, []);

  return (
    <div className='w-[70rem]'>
      <JoditEditor
        ref={editor}
        value={message}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={handleBlur} // preferred to use only this option to update the content for performance reasons
        onChange={newContent => setMessage(newContent)}
      />
    </div>
  );
};

export default MyEditorComponent;
