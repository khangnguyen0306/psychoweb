import React, { useEffect } from 'react';
import './slider.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const Slider = () => {
    useEffect(() => {
        const moveToNextItem = () => {
            let lists = document.querySelectorAll('.item');
            document.getElementById('slide').appendChild(lists[0]);
        };

        const moveToPreviousItem = () => {
            let lists = document.querySelectorAll('.item');
            document.getElementById('slide').prepend(lists[lists.length - 1]);
        };

        // Slider functionality for the 'Next' button
        document.getElementById('next').onclick = moveToNextItem;

        // Slider functionality for the 'Previous' button
        document.getElementById('prev').onclick = moveToPreviousItem;

        // Automatically move to the next item every 5 seconds
        const interval = setInterval(moveToNextItem, 5000);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
    
        <div className="container" >
            <div id="slide">
                <div className="item item1">
                    <div className="content">
                        <div className="name">Listening to Your Soul</div>
                        <div className="des">We are always ready to listen and accompany you through all mental challenges.</div>
                        <button className='button-more'>Explore Now</button>
                    </div>
                </div>
                <div className="item item2">
                    <div className="content">
                        <div className="name">Mental Health Matters</div>
                        <div className="des">Don't ignore the signs of stress, anxiety, or depression. Let us help you.</div>
                        <button className='button-more'>Learn More</button>
                    </div>
                </div>
                <div className="item item3">
                    <div className="content">
                        <div className="name">Top Psychological Experts</div>
                        <div className="des">Our team of experts is well-trained and dedicated to your well-being.</div>
                        <button className='button-more'>Book a Consultation</button>
                    </div>
                </div>
                <div className="item item4">
                    <div className="content">
                        <div className="name">Effective Treatment Methods</div>
                        <div className="des">We apply the most advanced treatment methods tailored to each individual.</div>
                        <button className='button-more'>See Methods</button>
                    </div>
                </div>
                <div className="item item5">
                    <div className="content">
                        <div className="name">Support 24/7</div>
                        <div className="des">We are always here, no matter the time, to help you through tough moments.</div>
                        <button className='button-more'>Contact Now</button>
                    </div>
                </div>
            </div>

            <div className="buttons">
                <button className="button-default" id="prev">
                    <LeftOutlined style={{ color: '#fff', fontSize: '20px' }} />
                </button>
                <button className="button-default" id="next">
                    <RightOutlined style={{ color: '#fff', fontSize: '20px' }} />
                </button>
            </div>
        </div>
    );
};

export default Slider;
