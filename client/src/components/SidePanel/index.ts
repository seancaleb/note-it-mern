import SidePanel from './SidePanel.component';

export { default as SidePanelButton } from './SidePanelButton.component';

export default SidePanel;

export interface SidePanelMenu {
    id: string;
    name: 'Dashboard' | 'Tasks' | 'Users';
    icon: ({ color }: { color: any }) => JSX.Element;
}
