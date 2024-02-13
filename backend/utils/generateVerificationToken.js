const generateVerificationToken = () => {
    const tokenLength = 20; // Adjust the length of the token as needed
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
  
    for (let i = 0; i < tokenLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters[randomIndex];
    }
  
    return token;
  };
  
  export default generateVerificationToken;
  