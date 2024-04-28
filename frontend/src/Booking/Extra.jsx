import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-blue-500">
            <div className="container mx-auto py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="text-white">
                            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
                            <p>Don’t miss any updates of our new templates and extensions.!</p>
                            <form action="#" className="mt-4">
                                <input type="text" name="email" className="px-4 py-2 w-full rounded-lg border border-gray-300" placeholder="Email" />
                                <button type="submit" className="mt-2 px-4 py-2 bg-white text-blue-500 rounded-lg hover:bg-blue-100">Subscribe</button>
                            </form>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Download</h3>
                        <ul className="text-white">
                            <li><a href="#">Company</a></li>
                            <li><a href="#">Android App</a></li>
                            <li><a href="#">iOS App</a></li>
                            <li><a href="#">Desktop</a></li>
                            <li><a href="#">Projects</a></li>
                            <li><a href="#">My Tasks</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Help</h3>
                        <ul className="text-white">
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Term & Conditions</a></li>
                            <li><a href="#">Reporting</a></li>
                            <li><a href="#">Documentation</a></li>
                            <li><a href="#">Support Policy</a></li>
                            <li><a href="#">Privacy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Team Solutions</h3>
                        <div className="text-white">
                            <a href="#" className="mr-4"><i className="fab fa-facebook"></i></a>
                            <a href="#" className="mr-4"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="mr-4"><i className="fab fa-linkedin"></i></a>
                            <a href="#"><i className="fab fa-pinterest"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-blue-700 py-4">
                <div className="container mx-auto text-white">
                    <p className="text-center">&copy; cakecounter Inc.. 2019 All rights reserved.</p>
                    <p className="text-center">Made with <i className="icon_heart"></i> in <a href="http://cakecounter.com" target="_blank">CakeCounter</a></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
