import { Card, CardBody, CardHeader, Button } from "@wordpress/components";
import { getComponent } from "./supportedFields";
import { useSettings } from "./Context";
import EditSetting from "./EditSetting";

const Setting = ({ setting }) => {
	const { deleteSetting } = useSettings();

	return (
		<Card style={{ marginBottom: "30px" }}>
			<>
				<CardHeader>
					<h2>{setting.title}</h2>
					<div>
						<Button
							style={{ marginRight: "10px" }}
							variant="secondary"
							isDestructive
							icon="trash"
							onClick={() => deleteSetting(setting.id)}
						/>
						<Button
							icon="clipboard"
							style={{ marginRight: "10px" }}
							variant="secondary"
							onClick={() => {
								window.navigator.clipboard.writeText(setting.id);
							}}
						/>
						<EditSetting setting={setting} />
					</div>
				</CardHeader>
				<CardBody>
					{setting.fields.map((field, index) => {
						const Component = getComponent(field.type);

						return <Component key={index} disabled {...field.props} />;
					})}
				</CardBody>
			</>
		</Card>
	);
};

export default Setting;
