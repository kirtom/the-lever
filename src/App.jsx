import { IOSDevice } from './components/IOSDevice';
import { useLever } from './useLever';
import { Welcome } from './screens/Welcome';
import { Profile } from './screens/Profile';
import { Home } from './screens/Home';
import { Question } from './screens/Question';
import { Matching } from './screens/Matching';
import { Instrument } from './screens/Instrument';
import { Run } from './screens/Run';
import { After } from './screens/After';
import { Held } from './screens/Held';
import { Harm } from './screens/Harm';
import { History } from './screens/History';
import { ProfileView } from './screens/ProfileView';

const SCREENS = {
  welcome: Welcome,
  profile: Profile,
  home: Home,
  question: Question,
  matching: Matching,
  instrument: Instrument,
  run: Run,
  after: After,
  held: Held,
  harm: Harm,
  history: History,
  profileView: ProfileView,
};

export default function App() {
  const { screen, derived, actions } = useLever();
  const Screen = SCREENS[screen] || Welcome;

  return (
    <div className="page">
      <IOSDevice dark={derived.frameDark} width={402} height={874}>
        <div style={{ minHeight: 874, display: 'flex', flexDirection: 'column', background: '#f3f2f2' }}>
          <Screen derived={derived} actions={actions} />
        </div>
      </IOSDevice>
    </div>
  );
}
