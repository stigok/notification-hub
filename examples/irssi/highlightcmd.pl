# Based on https://github.com/ramnes/hilightcmd with some modifications:
# - Changed script metadata, like name, author, contact and source URL
# - Minor refactor and code style
# - Escape doublequotes from hightlighted message to make it JSON compatible
# - Swallow stdout and bubble stderr

use strict;
use Irssi;
use POSIX;
use vars qw($VERSION %IRSSI);
use String::ShellQuote qw(shell_quote_best_effort);
use Text::Sprintf::Named qw(named_sprintf);

$VERSION = "0.1.0";
%IRSSI = (authors     => "Guillaume Gelin, Stig Otnes Kolstad",
          contact     => "stig\@stigok.com",
          name        => "highlightcmd",
          description => "Call a system command when a message is highlighted",
          license     => "GNU GPLv3",
          url         => "https://github.com/stigok/notification-hub/tree/master/examples/irssi");

Irssi::signal_add('print text' => sub {
    my ($dest, $text, $stripped) = @_;
    my $opt = MSGLEVEL_HILIGHT;

    if (Irssi::settings_get_bool($IRSSI{name}.'_privmsg')) {
        $opt = MSGLEVEL_HILIGHT|MSGLEVEL_MSGS;
    }

    if (($dest->{level} & ($opt))
        && ($dest->{level} & MSGLEVEL_NOHILIGHT) == 0
        && (Irssi::active_win()->{refnum} != $dest->{window}->{refnum}
            || Irssi::settings_get_bool($IRSSI{name}.'_currentwin'))) {

        # Remove leading and trailing whitespace
        $stripped =~ s/^\s+|\s+$//g;
        # Escape doublequotes which could mess up the JSON format
        $stripped =~ s/"|\"//g;

        my $cmd = named_sprintf(
            Irssi::settings_get_str($IRSSI{name}.'_systemcmd'),
            message => shell_quote_best_effort $stripped
        );

        # Run command, swallow stdout, while stderr still bubbles up nicely
        qx`$cmd`;
    }
});

Irssi::settings_add_bool($IRSSI{name}, $IRSSI{name}.'_privmsg', 1);
Irssi::settings_add_bool($IRSSI{name}, $IRSSI{name}.'_currentwin', 1);
Irssi::settings_add_str($IRSSI{name}, $IRSSI{name}.'_systemcmd', "logger -t irssi-".$IRSSI{name}." missing systemcmd");
