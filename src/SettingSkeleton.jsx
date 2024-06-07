import { Card, CardBody, CardHeader } from "@wordpress/components";

const SettingSkeleton = () => {
	return (
		<Card style={{ marginBottom: "30px" }}>
			<>
				<CardHeader>
					<h2>
						<span
							style={{
								backgroundColor: "#ccc",
								display: "inline-block",
								width: "200px",
								height: "1em",
							}}
						></span>
					</h2>
					<div>
						<span
							style={{
								backgroundColor: "#ccc",
								display: "inline-block",
								width: "100px",
								height: "1em",
							}}
						></span>
					</div>
				</CardHeader>
				<CardBody>
					<div
						style={{
							backgroundColor: "#ccc",
							width: "100%",
							height: "2em",
							marginBottom: "10px",
						}}
					></div>
					<div
						style={{
							backgroundColor: "#ccc",
							width: "100%",
							height: "2em",
							marginBottom: "10px",
						}}
					></div>
					<div
						style={{
							backgroundColor: "#ccc",
							width: "100%",
							height: "2em",
							marginBottom: "10px",
						}}
					></div>
				</CardBody>
			</>
		</Card>
	);
};

export default SettingSkeleton;
