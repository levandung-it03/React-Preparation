import '../css/App.css';
import { INP_ENUM, InputReactBuilder } from './FormCompos';
import { FORM_ENUM, FormReactBuilder } from './FormCompos';

function App() {
  const FullNameInpCompo = InputReactBuilder()
    .label("Full Name")
    .name("fullName")
    .placeholder("Type anything")
    .type("password")
    .maxLength(20)
    .autoComplete(INP_ENUM.PROPS.AUTO_COMPLETE.OFF)
    .required(true)
    .orderedValidators([
      { check: (v) => (/^ *[A-Za-zÀ-ỹ]{1,50}( *[A-Za-zÀ-ỹ]{1,50})* *$/.test(v)), errMsg: "Content must be text" },
      { check: (v) => (v.length > 9), errMsg: "Content too short" },
    ])
    .moreFeaturesOnBlur([ INP_ENUM.FEATURES.AUTO_CAPITALIZE ]).build();

  const DOBInpCompo = InputReactBuilder()
    .label("Date Of Birth")
    .name("birthday")
    .type("date")
    .required(true)
    .orderedValidators([
      { check: (v) => (new Date().getFullYear() - new Date(v).getFullYear() >= 18), errMsg: "Client must be adults" },
    ])
    .build();

  const FormCompo = FormReactBuilder()
    .addFormChild(FullNameInpCompo)
    .addFormChild(DOBInpCompo)
    .method("post")
    .action("")
    .build();

  return (
    <div className="App">
      <header className="App-header">
        <FormCompo />
      </header>
    </div>
  );
}

export default App;
