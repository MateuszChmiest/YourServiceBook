import React from "react";
import carImg from "../../images/your-car.png";

const CurrentCar = () => {
	return (
		<div className='CurrentCar'>
            <h1>Your Car</h1>
			<div className='CurrentCar__box'>
				<div className='CurrentCar__list'>
					<ul className='CurrentCar__items'>
						<li>adad</li>
						<li>dada</li>
						<li>dada</li>
						<li>dada</li>
						<li>adad</li>
                        <li>adad</li>
                        <li>adad</li>
					</ul>
				</div>
				<div className='CurrentCar__img'>
					<img src={carImg} />
				</div>
			</div>
		</div>
	);
};

export default CurrentCar;
