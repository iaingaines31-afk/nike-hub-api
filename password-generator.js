// EXAMPLE ADD-ON for the Data Vault. Every .js file in the "data-addons" folder of your repo loads automatically after unlock.
// API:  NHData.register({ name, render(box, api) })   api.entries()  api.setEntries(newArray)  api.say(text)  api.user()  api.account()
NHData.register({
  name: 'Password generator',
  render: function (box, api) {
    var out = document.createElement('input'); out.readOnly = true; out.placeholder = 'Press Generate';
    var label = document.createElement('input'); label.placeholder = 'Label to save it under (optional)';
    var row = document.createElement('div'); row.className = 'row';
    var gen = document.createElement('button'); gen.textContent = 'Generate';
    var save = document.createElement('button'); save.textContent = 'Save as entry';
    gen.onclick = function () {
      var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*', a = new Uint32Array(16), s = '';
      crypto.getRandomValues(a); for (var i = 0; i < a.length; i++) s += chars[a[i] % chars.length]; out.value = s;
    };
    save.onclick = async function () {
      if (!out.value) return api.say('Generate one first.');
      var list = api.entries().slice(); list.push({ site: label.value || 'Generated password', user: '', pass: out.value, note: '' });
      await api.setEntries(list); api.say('Saved (encrypted).');
    };
    row.append(gen, save); box.append(out, label, row);
  }
});
