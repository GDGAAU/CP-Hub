import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
console.log('LocalStrategy is a constructor:', typeof LocalStrategy === 'function');
try {
    new LocalStrategy(() => { });
    console.log('LocalStrategy instantiation: Success');
} catch (e) {
    console.log('LocalStrategy instantiation: Failed -', e.message);
}

console.log('GoogleStrategy is a constructor:', typeof GoogleStrategy === 'function');
try {
    // Needs options, but just testing if it's a constructor
    new GoogleStrategy({ clientID: 'x', clientSecret: 'y', callbackURL: 'z' }, () => { });
    console.log('GoogleStrategy instantiation: Success');
} catch (e) {
    console.log('GoogleStrategy instantiation: Failed -', e.message);
}
