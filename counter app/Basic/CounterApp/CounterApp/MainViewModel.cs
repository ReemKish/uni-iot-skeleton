using System;
using System.ComponentModel;
using System.Net.Http;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using Xamarin.Forms;

namespace CounterApp
{
    public class MainViewModel : INotifyPropertyChanged
    {
        private int _counter;
        public int Counter
        {
            get => _counter;
            set => SetProperty(ref _counter, value);
        }

        public ICommand IncrementCounterCommand { get; }

        public event PropertyChangedEventHandler PropertyChanged;


        public async Task getCounter() {
            string URL = "https://skeletonfunctionsapp.azurewebsites.net/api/GetCounter";
            HttpClient client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync(URL);
            String res = await response.Content.ReadAsStringAsync();
            try {
                Counter = Int32.Parse(res);
            }
            catch (FormatException e) {
                Counter = -1;
            }
        }
        public async Task setCounter(int value)
        {
            string URL = $"https://skeletonfunctionsapp.azurewebsites.net/api/UpdateCounter?value={value}";
            HttpClient client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync(URL);
        }

        public MainViewModel()
        {
            IncrementCounterCommand = new Command<string>(IncrementCounter);
            getCounter();
        }

        protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }

        private void IncrementCounter(string counterId)
        {
            setCounter(Counter + 1);
        }

        private void signalRUpdate(int value) {
                Counter = value;
        }

        private bool SetProperty<T>(ref T storage, T value, [CallerMemberName] string propertyName = null)
        {
            if (Equals(storage, value))
                return false;

            storage = value;
            OnPropertyChanged(propertyName);
            return true;
        }
    }
}